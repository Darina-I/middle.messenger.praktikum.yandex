import { Link } from '../../atoms/Link';
import { SearchInput } from '../../molecules/Search';
import Block from '../../../framework/Block';
import template from './listChatsBlock.hbs?raw';
import { ListChatsProps } from '../../../types/chatTypes';
import { CreateChatBlock } from '../../molecules/Chat/CreateChat';

export class ListChatsBlock extends Block {
    constructor(props: ListChatsProps) {
        super({
            chats: props.allChats,
            isOpenCreateChat: false,
            LinkProfile: new Link({
                id: 'profile-link',
                class: 'page-link',
                datapage: 'profile',
                content: 'Профиль',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.router.go('/settings');
                    },
                },
            }),
            SearchInput: new SearchInput(),
            CreateChatLink: new Link({
                id: 'create-chat-link',
                class: 'create-chat',
                content: '+ Создать чат',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.setProps({ isOpenCreateChat: true });
                    },
                },
            }),
            CreateChatPopup: new CreateChatBlock({
                updateInfo: () => props.onUpdateChats(),
                closePopup: () => {
                    this.setProps({ isOpenCreateChat: false });
                },
            }),
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    const chatCard = target.closest('.chat__card') as HTMLElement;
                    if(chatCard){
                        const currentChat = Object.fromEntries(Object.entries(chatCard.dataset)) as Record<string,string>;

                        if(currentChat){
                            props.onChangeChat(currentChat);
                        }
                    }
                }
            }
        });
    }

    setProps(nextProps: Record<string, unknown>) {
        if (nextProps.allChats) this.props.chats = nextProps.allChats;
        super.setProps(nextProps);
    }

    override render(): string {
        return template;
    }
}






