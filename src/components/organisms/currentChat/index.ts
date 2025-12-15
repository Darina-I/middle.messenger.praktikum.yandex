import Block from '../../../framework/Block';
import template from './currentChatBlock.hbs?raw';
import { MessageInput } from '../../molecules/MessageSend';
import { CurrentChatProps } from '../../../types';

export class CurrentChatBlock extends Block {
    constructor(props: CurrentChatProps) {
        super({
            chatMessages: props.chatMessages,
            MessageInput: new MessageInput(),
        });
    }

    override render(): string {
        return template;
    }
}
