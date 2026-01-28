import { Button } from '../../atoms/Button';
import { FullInput } from '../FullInput';
import Block from '../../../framework/Block';
import template from './changeAvatar.hbs?raw';
import { PopupProps } from '../../../types';
import { UserController } from '../../../controllers/userController';

export class ChangeAvatarBlock extends Block {
    private userController = new UserController();

    constructor(props: PopupProps) {
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
                submit: async(e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);

                    await this.userController.updateAvatar(formData);
                    props.closePopup();
                }
            }
        });
    }

    override render(): string {
        return template;
    }
}





