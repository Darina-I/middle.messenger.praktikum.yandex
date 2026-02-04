import Block from '../../../framework/Block';
import template from './currentChatBlock.hbs?raw';
import { MessageInput } from '../../molecules/MessageSend';
import { CurrentChatProps } from '../../../types/chatTypes';
import { AddUserToChat } from '../../molecules/Chat/AddUserToChat';
import { ChatController } from '../../../controllers/chatController';
import { AuthController } from '../../../controllers/authController';
import { Message } from '../../../types/responseData';
import { getTime, getDate, canShowDate } from '../../../utils/dateUtils';
import { DeleteUserFromChat } from '../../molecules/Chat/DeleteUserFromChat';
import { DeleteChatBlock } from '../../molecules/Chat/DeleteChat';

export class CurrentChatBlock extends Block {
    private sockets: Map<string, WebSocket> = new Map();
    private currentChatId: string | null = null;
    private messagesByChat: Map<string, Message[]> = new Map();

    private chatController = new ChatController();
    private authController = new AuthController();

    constructor(props: CurrentChatProps) {
        super({
            isOpenSelect: false,
            isOpenAddUser: false,
            isOpenDeleteUser: false,
            isOpenDeleteChat: false,
            chat: props.currentChat,
            messages: [],
            userId: null,
            MessageInput: new MessageInput({
                onSendMessage: (content: string) => this.sendMessage(content, this.currentChatId!),
            }),
            AddUser: new AddUserToChat({
                closePopup: () => {
                    this.setProps({ isOpenAddUser: false });
                },
            }),
            DeleteUser: new DeleteUserFromChat({
                chatId: props.currentChat?.id,
                closePopup: () => {
                    this.setProps({ isOpenDeleteUser: false });
                },
            }),
            DeleteChat: new DeleteChatBlock({
                chatId: props.currentChat?.id,
                closePopup: () => {
                    this.setProps({ isOpenDeleteChat: false });
                },
                updateInfo: () => props.onUpdateChats(),
            }),
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;

                    switch(target.id) {
                        case 'open-select':
                            this.setProps({ isOpenSelect: !(this.props.isOpenSelect as boolean) });
                            break;
                        case 'add-user':
                            this.setProps({ isOpenAddUser: true });
                            break;
                        case 'delete-user':
                            this.setProps({ isOpenDeleteUser: true });
                            break;
                        case 'delete-chat':
                            this.setProps({ isOpenDeleteChat: true });
                            break;
                    }
                }
            }
        });
    }

    setProps(nextProps: Record<string, unknown>) {
        if (nextProps.currentChat) {
            const chatId = (nextProps.currentChat as Record<string, string>).id;
            this.currentChatId = chatId;

            if (chatId && !this.sockets.has(chatId)) {
                this.connectWebSocket(chatId);
            }

            const currentMessages = this.messagesByChat.get(chatId) || [];

            const updatedProps = {
                ...nextProps,
                messages: currentMessages,
                chat: nextProps.currentChat
            };

            const addUserBlock = this.children.AddUser as AddUserToChat;
            if (addUserBlock) {
                addUserBlock.setProps({ chatId });
            }

            const deleteUserBlock = this.children.DeleteUser as DeleteUserFromChat;
            if (deleteUserBlock) {
                deleteUserBlock.setProps({ chatId });
            }

            const deleteChatBlock = this.children.DeleteChat as DeleteChatBlock;
            if (deleteChatBlock) {
                deleteChatBlock.setProps({ chatId });
            }

            super.setProps(updatedProps);
        } else {
            super.setProps(nextProps);
        }
    }

    private async connectWebSocket(chatId: string) {
        try {
            const responseToken = await this.chatController.getToken(chatId);
            const token = JSON.parse(responseToken?.response as string).token;

            const responseUser = await this.authController.getUser();
            const userId = JSON.parse(responseUser?.response as string).id;
            
            if (!this.props.userId) {
                this.setProps({ ...this.props, userId });
            }

            const socket = new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
            );
            this.sockets.set(chatId, socket);

            const pingInterval = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ type: 'ping' }));
                }
            }, 30000);

            socket.addEventListener('open', () => {
                console.log(`(WS) Соединение установлено для чата ${chatId}`);

                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ 
                        type: 'get old', 
                        content: '0' 
                    }));
                }
            });

            socket.addEventListener('close', event => {
                console.log(`(WS) Соединение закрыто для чата ${chatId}`);
                console.log(`(WS) Код: ${event.code} | Причина: ${event.reason}`);
                
                this.sockets.delete(chatId);
                clearInterval(pingInterval);
            });

            socket.addEventListener('message', event => {
                let data;
                try{
                    data = JSON.parse(event.data as string);  
                } catch (error) {
                    console.error('Ошибка парсинга Websocket сообщения', error);
                    return;
                }
                

                if (data.type === 'pong' || data.type === 'user connected') return;

                if (Array.isArray(data)) {
                    const messages = data.reverse().map((msg: Message, index: number, arr: Message[]) => ({
                        ...msg,
                        isOwn: msg.user_id !== this.props.userId,
                        time: getTime(msg.time),
                        date: getDate(msg.time),
                        fullDateTime: msg.time,
                        showDate: index === 0 || canShowDate(arr[index - 1]?.time, msg.time)
                    }));

                    this.messagesByChat.set(chatId, messages);
                    
                    if (this.currentChatId === chatId) {
                        this.setProps({ 
                            ...this.props, 
                            messages 
                        });
                    }
                    return;
                }

                if (data.type === 'message') {
                    const currentMessages = this.messagesByChat.get(chatId) || [];
                    const lastMessage = currentMessages[currentMessages.length - 1];
                    
                    const newMessage = {
                        ...data,
                        isOwn: data.user_id !== (this.props.userId as number),
                        time: getTime(data.time),
                        date: getDate(data.time),
                        showDate: lastMessage ? canShowDate(lastMessage.fullDateTime, data.time) : true,
                    };

                    const updatedMessages = [...currentMessages, newMessage];
                    this.messagesByChat.set(chatId, updatedMessages);
                    
                    if (this.currentChatId === chatId) {
                        this.setProps({ 
                            ...this.props, 
                            messages: updatedMessages 
                        });
                    }
                }
            });

            socket.addEventListener('error', event => {
                console.log(`(WS) Ошибка для чата ${chatId}:`, event);
            });

        } catch (error) {
            console.error(`Ошибка подключения WebSocket к чату ${chatId}:`, error);
        }
    }

    private sendMessage(content: string, chatId: string) {
        if (!chatId) {
            console.warn('Нет ID чата для отправки сообщения');
            return;
        }

        const socket = this.sockets.get(chatId);
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.warn(`WebSocket для чата ${chatId} не готов`);
            return;
        }

        socket.send(JSON.stringify({
            content: content.trim(),
            type: 'message'
        }));
    }

    override render(): string {
        return template;
    }
}




