import { Button } from '../../components/atoms/Button';
import { Footer } from '../../components/molecules/Footer';
import { FullInput } from '../../components/molecules/FullInput';
import { Link } from '../../components/atoms/Link';
import { ChangeAvatarBlock } from '../../components/molecules/ChangeAvatar';
import Block from '../../framework/Block';
import template from './profileUser.hbs?raw';
import { mockUserProfile } from '../../mockData';
import { PropsWithChangePage } from '../../types';
import { profileValidator, changePasswordValidator } from '../../utils/validators';

export class ProfilePageBlock extends Block {
    constructor(props: PropsWithChangePage) {

        const inputs: Record<string, FullInput> = {};

        const user = mockUserProfile.map((field) => {
        const key = `Input_${field.inputName}`;

        inputs[key] = new FullInput({
            id: field.name,
            class: 'edit-profile__input',
            type: 'text',
            name: field.name,
            placeholder: field.inputName,
            value: field.value,
            validator: profileValidator,
        });

        return {
            name: field.name,
            value: field.value,
            inputName: field.inputName,
            inputKey: key,             
        };
        });

        super({
            user,
            ...inputs,
            isOpenChangeAvatar: false,
            isEditProfile: false,
            isChangePassword: false,
            ButtonBack: new Button({
                id: 'back-button',
                content: '<svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + 
            '<g id="SVGRepo_bgCarrier" stroke-width="0"></g>' +
            '<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>' +
            '<g id="SVGRepo_iconCarrier" transform="rotate(180 12 12)">' +
                '<path d="M20 12L4 12M20 12L14 18M20 12L14 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
            '</g></svg>',
                isRounded: true,
            }),
            ChangeAvatar: new ChangeAvatarBlock({
                closePopup: () => {
                    this.setProps({ isOpenChangeAvatar: false });
                },
            }),
            InputOldPassword: new FullInput({
                id: 'oldPassword',
                class: 'edit-profile__input',
                type: 'password',
                name: 'oldPassword',
                placeholder: 'Старый пароль',

            }),
            InputNewPassword: new FullInput({
                id: 'newPassword',
                class: 'edit-profile__input',
                type: 'password',
                name: 'newPassword',
                placeholder: 'Новый пароль',
                validator: changePasswordValidator,
            }),
            InputRepeatPassword: new FullInput({
                id: 'repeat_newPassword',
                class: 'edit-profile__input',
                type: 'password',
                name: 'repeatNewPassword',
                placeholder: 'Повторите новый пароль',
            }),
            ButtonEdit: new Button({
                id: 'edit-button',
                type: 'submit',
                content: 'Сохранить',
            }),
            ButtonChangePassword: new Button({
                id: 'change-password-button',
                type: 'submit',
                content: 'Сохранить',
            }),
            LinkChangeInfo: new Link({
                id: 'change-info-link',
                content: 'Изменить данные',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();

                        this.setProps({ isEditProfile: true }); 
                    }
                }
            }),
            LinkChangePassword: new Link({
                id: 'change-password-link',
                content: 'Изменить пароль',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();

                        this.setProps({ isChangePassword: true });
                    },
                },
            }),
            LinkLogout: new Link({
                id: 'logout-link',
                content: 'Выйти',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();

                        props.onChangePage('login');
                    },
                },
            }),
            Footer: new Footer({
                onChangePage: props.onChangePage,
            }),
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const submitButton = (e.target as HTMLElement).querySelector('button[type="submit"]:focus');
                    let validator = profileValidator;
                    if (submitButton?.id === 'edit-button'){
                        this.setProps({ isEditProfile: false }); 
                    }
                    else if (submitButton?.id === 'change-password-button'){
                        this.setProps({ isChangePassword: false });
                        validator = changePasswordValidator;
                    }

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = validator.validateForm(data as Record<string, string>);
                    if(!isValid){
                        console.log('Форма невалидны');
                        console.log('Ошибки:', validator.getErrors());
                    }
                    else{
                        console.log('Форма валидны');
                        console.log('Данные формы:', data);
                        props.onChangePage('chat');
                    } 
                },
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    if(target.closest('#avatar')){
                        this.setProps({ isOpenChangeAvatar: true });
                    }

                    if (target.closest('#back-button')) {
                        props.onChangePage('chat');
                        return;
                    }
                },
            }
        });
    }

    override render(): string {
        return template;
    }
}





