import Block from '../../../framework/Block';
import { Link } from '../../atoms/Link';
import { PropsWithChangePage } from '../../../types';
import template from './footer.hbs?raw';

export class Footer extends Block {
    constructor(props: PropsWithChangePage) {
        super({
            LinkLogin: new Link({
                href: '#',
                class: 'page-link',
                datapage: 'login',
                content: 'Авторизация',
            }),
            LinkRegister: new Link({
                href: '#',
                class: 'page-link',
                datapage: 'register',
                content: 'Регистация',
            }),
            LinkChat: new Link({
                href: '#',
                class: 'page-link',
                datapage: 'chat',
                content: 'Список чатов',
            }),
            LinkProfile: new Link({
                href: '#',
                class: 'page-link',
                datapage: 'profile',
                content: 'Профиль',
            }),
            LinkError500: new Link({
                href: '#',
                class: 'page-link',
                datapage: 'error500',
                content: 'Ошибка 500',
            }),
            LinkError404: new Link({
                href: '#',
                class: 'page-link',
                datapage: 'error404',
                content: 'Ошибка 404',
            }),
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const target = e.target as HTMLElement;
                    const datapage = target.dataset.page;

                    if(datapage){
                      props.onChangePage(datapage);  
                    }
                },
            },
        });
    }

    override render(): string {
        return template;
    }
};





