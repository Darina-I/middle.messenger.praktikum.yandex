import { CurrentChatBlock } from '../../components/organisms/currentChat';
import { ListChatsBlock } from '../../components/organisms/listChats';
import { ChatController } from '../../controllers/chatController';
import Block from '../../framework/Block';
import template from './chatPage.hbs?raw';
import { getDate, getTime } from '../../utils/dateUtils';
import { Chat } from '../../types/chatTypes';

export class ChatPageBlock extends Block {
    private chatController = new ChatController();

    constructor() {
        super({
            ListChats: new ListChatsBlock({
                onChangeChat: (currentChat: Record<string, string>) => this.selectChat(currentChat),
                onUpdateChats: () => this.loadChatsData(),
            }),
            CurrentChat: new CurrentChatBlock({
                onUpdateChats: () => this.loadChatsData(),
            })
        });

        this.loadChatsData();
    }

    override render(): string {
        return template;
    }

    private async selectChat(currentChat: Record<string, string>){
        const currentChatBlock = this.children.CurrentChat as CurrentChatBlock;
        currentChatBlock.setProps({
            currentChat: currentChat,
        });
    }

    public async loadChatsData() {
        const chatResponse = await this.chatController.getChats();
        const chatsData = JSON.parse(chatResponse?.response);

        chatsData.forEach((chat: Chat) => {
            if(chat.last_message?.time) {
                const time = chat.last_message.time;
                const chatDate = getDate(time, 'short');
                const today = new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                });

                chat.last_message.time = chatDate === today ? getTime(time) : chatDate;
            }
        });

        const listChatsBlock = this.children.ListChats as ListChatsBlock;
        listChatsBlock.setProps({ allChats: chatsData });
    }
}





