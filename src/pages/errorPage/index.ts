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

                        props.onChangePage('chat');
                    },
                },
            }),
        });
    }

    override render(): string {
        return template;
    }
}




