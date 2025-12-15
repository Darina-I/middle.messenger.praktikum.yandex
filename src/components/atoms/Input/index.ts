import Block from '../../../framework/Block';
import { InputProps } from '../../../types';
import { FieldName } from '../../../utils/validators';
import template from './input.hbs?raw';

export class Input extends Block {
    constructor(props: InputProps){
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    const input = e.target as HTMLInputElement;
                    if(props.name && props.validator){
                        const error = props.validator.validateField(props.name as FieldName, input.value);
                        if (props.onError) {
                            props.onError(error);
                        }
                    }

                }
            },
        });
    }

    override render() {
        return template;
    }
}



