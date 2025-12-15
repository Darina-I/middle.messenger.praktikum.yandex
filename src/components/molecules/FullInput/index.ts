import Block from '../../../framework/Block';
import { InputProps } from '../../../types';
import template from './fullInput.hbs?raw';
import { Input } from '../../atoms/Input';

export class FullInput extends Block {
    constructor(props: InputProps){
        super({
            ...props,
            error: '',
            Input: new Input({
                ...props, 
                onError: (error: string) => this.setProps({ error }),
            }),
        });
    }

    override render() {
        return template;
    }
}



