import { Button } from '../../../atoms/Button';
import Block from '../../../../framework/Block';
import template from './deleteChat.hbs?raw';
import { PopupProps } from '../../../../types';
import { ChatController } from '../../../../controllers/chatController';
import { DeleteChatData } from '../../../../types/responseData';

export class DeleteChatBlock extends Block {
    private chatController = new ChatController();

    constructor(props: PopupProps) {
        super({
            ...props,
            ButtonDeleteChat: new Button({
                id: 'delete-chat-button',
                type: 'submit',
                content: 'Удалить',
                isRed: true,
            }),
            events: {
                submit: async(e: Event) => {
                    e.preventDefault();

                    const data = {'chatId': this.props.chatId};
                    await this.chatController.deleteChat(data as unknown as DeleteChatData);
                    props.updateInfo?.();
                    props.closePopup();
                }
            }
        });
    }

    setProps(nextProps: Record<string, unknown>) {
        if (nextProps.chatId){
            this.props.chatId = nextProps.chatId;
        } 

        super.setProps(nextProps);
    }

    override render(): string {
        return template;
    }
}





