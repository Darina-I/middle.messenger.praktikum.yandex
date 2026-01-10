import Block from '../../../framework/Block';
import { ButtonProps } from '../../../types';
import template from './button.hbs?raw';

export class Button extends Block {
    constructor(props: ButtonProps){
        super({
            ...props,
            events: {},
        });
    }

    override render() {
        return template;
    }
};
    




