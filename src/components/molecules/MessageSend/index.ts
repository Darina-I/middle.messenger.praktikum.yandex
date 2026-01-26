import Block from '../../../framework/Block';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import template from './messageInput.hbs?raw';
import { messageValidator } from '../../../utils/validators';

export class MessageInput extends Block {
    constructor(props: {onSendMessage: (content: string) => void}){
        super({
            MessageInput: new Input({
                id: 'message-input',
                type: 'text',
                name: 'message',
                placeholder: 'Сообщение',
            }),
            ButtonSendMessage: new Button({
                id: 'message-send-button',
                type: 'submit',
                content: '<svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12L4 12M20 12L14 18M20 12L14 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
                isRounded: true,
            }),
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = messageValidator.validateForm(data as Record<string, string>);
                    if(!isValid){ return;}
                    
                    const content = String(formData.get('message'));
                    props.onSendMessage(content);
                    form.reset();
                }
            },
        });
    }

    override render(): string {
        return template;
    }
};





