import { Link } from '../../atoms/Link';
import { Footer } from '../../molecules/Footer';
import { SearchInput } from '../../molecules/Search';
import Block from '../../../framework/Block';
import template from './listChatsBlock.hbs?raw';
import { mockChats } from '../../../mockData';
import { ListChatsProps } from '../../../types';

export class ListChatsBlock extends Block {
    constructor(props: ListChatsProps) {
        super({
            chats: mockChats,
            LinkProfile: new Link({
                id: 'profile-link',
                class: 'page-link',
                datapage: 'profile',
                content: 'Профиль',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();

                        props.onChangePage('profile');
                    },
                },
            }),
            SearchInput: new SearchInput(),
            Footer: new Footer({
                onChangePage: props.onChangePage,
            }),
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    const chatCard = target.closest('.chat__card') as HTMLElement;

                    const chatId = chatCard?.dataset.id;
                    if(chatId){
                        props.onChangeChat(chatId);
                    }
                }
            }
        });
    }

    override render(): string {
        return template;
    }
}






