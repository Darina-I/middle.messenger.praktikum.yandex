import { CurrentChatBlock } from '../../components/organisms/currentChat';
import { ListChatsBlock } from '../../components/organisms/listChats';
import Block from '../../framework/Block';
import { ChatPageProps } from '../../types';
import template from './chatPage.hbs?raw';

export class ChatPageBlock extends Block {
    constructor(props: ChatPageProps) {
        super({
            ListChats: new ListChatsBlock({
                onChangePage: props.onChangePage,
                onChangeChat: props.onChangeChat,
            }),
            CurrentChat: new CurrentChatBlock({
                chatMessages: props.chatMessages,
            })
        });
    }

    override render(): string {
        return template;
    }
}



