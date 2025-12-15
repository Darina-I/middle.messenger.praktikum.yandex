import { Button } from '../../atoms/Button';
import { FullInput } from '../FullInput';
import Block from '../../../framework/Block';
import template from './changeAvatar.hbs?raw';
import { ChangeAvatarProps } from '../../../types';

export class ChangeAvatarBlock extends Block {
    constructor(props: ChangeAvatarProps) {
        super({
            InputAvatar: new FullInput({
                id: 'avatar-input',
                type: 'file',
                name: 'avatar',
                label: 'Выбрать файл на компьютере',
            }),
            ButtonChangeAvatar: new Button({
                id: 'change-avatar-button',
                type: 'submit',
                content: 'Поменять',
            }),
            events: {
                submit: (e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    console.log('Данные формы:', data);
                    
                    props.closePopup();
                }
            }
        });
    }

    override render(): string {
        return template;
    }
}





