import Block from '../../../../framework/Block';
import { PopupProps } from '../../../../types';
import template from './deleteUserFromChat.hbs?raw';
import { Button } from '../../../atoms/Button';
import { ChatController } from '../../../../controllers/chatController';
import { DeleteUsersData } from '../../../../types/responseData';

export class DeleteUserFromChat extends Block {
    private chatController = new ChatController();

    constructor(props: PopupProps) {
        super({
            chatId: props.chatId,
            users: [],
            ButtonDeleteUser: new Button({
                id: 'deleteUser-button',
                type: 'submit',
                content: 'Удалить',
            }),
            ButtonBack: new Button({
                id: 'back-button',
                content: 'Отмена',
                isRed: true,
            }),
            events: {
                submit: async(e: Event) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = {
                        users: [formData.get('users')],
                        chatId: this.props.chatId,
                    };
                    
                    await this.chatController.deleteUsers(data as  unknown as DeleteUsersData);
                    props.closePopup();
                    
                },
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    if(target.id === 'back-button'){
                        props.closePopup();
                    }
                },
            }
        });
    }

    setProps(nextProps: Record<string, unknown>) {
        if (nextProps.chatId){
            this.props.chatId = nextProps.chatId;
            this.loadUsersChat(String(nextProps.chatId));
        } 

        super.setProps(nextProps);
    }

    private async loadUsersChat(chatId?: string) {
        const usersResponse = await this.chatController.getUsers(String(chatId));
        
        let usersData;
        try{
            usersData = JSON.parse(usersResponse?.response);
        } catch(error){
            console.error('Ошибка в парсинге JSON-ответа', error);
            return;
        }

        this.setProps({ users: usersData });
    }

    override render(): string {
        return template;
    }
};



