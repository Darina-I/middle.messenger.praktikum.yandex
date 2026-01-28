import Block from '../../framework/Block';
import template from './errorPage.hbs?raw';
import { Link } from '../../components/atoms/Link';
import { ErrorPageProps } from '../../types';

export class ErrorPageBlock extends Block {
    constructor(props: ErrorPageProps) {
        super({
            error: props.error,
            content: props.content,
            LinkBack: new Link({
                class: 'page-link',
                datapage: 'chat',
                content: 'Назад к чатам',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();

                       window.router.go('/messenger');
                    },
                },
            }),
        });
    }

    override render(): string {
        return template;
    }
}


export class Error404Page extends ErrorPageBlock {
    constructor(){
        super({
            error: '404',
            content: 'Не туда попали'
        });
    }
}

export class Error500Page extends ErrorPageBlock {
    constructor(){
        super({
            error: '500',
            content: 'Мы уже фиксим'
        });
    }
}



