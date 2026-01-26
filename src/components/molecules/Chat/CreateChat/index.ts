import { Button } from '../../../atoms/Button';
import { FullInput } from '../../FullInput';
import Block from '../../../../framework/Block';
import template from './createChat.hbs?raw';
import { PopupProps } from '../../../../types';
import { ChatController } from '../../../../controllers/chatController';
import { CreateChatData } from '../../../../types/responseData';

export class CreateChatBlock extends Block {
    private chatController = new ChatController();

    constructor(props: PopupProps) {
        super({
            ...props,
            InputTitle: new FullInput({
                id: 'title-input',
                type: 'text',
                name: 'title',
                label: 'Название чата',
            }),
            ButtonCreateChat: new Button({
                id: 'create-chat-button',
                type: 'submit',
                content: 'Создать',
            }),
            events: {
                submit: async(e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    
                    await this.chatController.createChat(data as unknown as CreateChatData);
                    props.updateInfo?.();
                    props.closePopup();
                }
            }
        });
    }

    override render(): string {
        return template;
    }
}





