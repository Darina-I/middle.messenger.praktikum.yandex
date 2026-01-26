import Block from '../../../../framework/Block';
import { PopupProps } from '../../../../types';
import { FullInput } from '../../FullInput';
import template from './addUserToChat.hbs?raw';
import { Button } from '../../../atoms/Button';
import { UserController } from '../../../../controllers/userController';
import { AddUserData, SearchUserData } from '../../../../types/responseData';
import { ChatController } from '../../../../controllers/chatController';

export class AddUserToChat extends Block {
    private userController = new UserController();
    private chatController = new ChatController();

    constructor(props: PopupProps) {
        super({
            chatId: props.chatId,
            resultSearch: [],
            InputSearch: new FullInput({
                id: 'search-input',
                type: 'text',
                name: 'login',
                label: 'Введите логин пользователя',
            }),
            ButtonSearch: new Button({
                id: 'searchUser-button',
                type: 'submit',
                content: 'Найти',
            }),
            ButtonAddUser: new Button({
                id: 'addUser-button',
                type: 'submit',
                content: 'Добавить в чат',
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

                    if(form.id === 'form-searchUser'){
                        const data = Object.fromEntries(formData.entries());
                        const response = await this.userController.searchUser(data as unknown as SearchUserData);
                        const usersData = JSON.parse(response?.response);
                        this.setProps({ resultSearch: usersData });
                    }
                    else if(form.id === 'add_user'){
                        const data = {
                            users: [formData.get('users')],
                            chatId: this.props.chatId,
                        };

                        await this.chatController.addUsers(data as unknown as AddUserData);
                        props.closePopup();
                    }
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

    override render(): string {
        return template;
    }
};



