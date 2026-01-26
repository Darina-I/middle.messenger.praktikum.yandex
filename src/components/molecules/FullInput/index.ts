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

    setValue(value: string): void {
        const inputComponent = this.children.Input as Block;
        if (inputComponent && 'setProps' in inputComponent){
            inputComponent.setProps({value});
        }
    }

    override render() {
        return template;
    }
}



