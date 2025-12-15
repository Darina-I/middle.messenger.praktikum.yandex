import Block from '../../../framework/Block';
import { Input } from '../../atoms/Input';
import template from './searchInput.hbs?raw';

export class SearchInput extends Block {
    constructor(){
        super({
            SearchInput: new Input({
                id: 'search-input',
                type: 'search',
                name: 'search',
                placeholder: 'Поиск',
            }),
            events: {},
        });
    }

    override render(): string {
        return template;
    }
};



