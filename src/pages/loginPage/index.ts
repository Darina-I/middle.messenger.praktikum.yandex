import { Button } from '../../components/atoms/Button';
import { Footer } from '../../components/molecules/Footer';
import { FullInput } from '../../components/molecules/FullInput';
import { Link } from '../../components/atoms/Link';
import Block from '../../framework/Block';
import template from './loginUser.hbs?raw';
import { PropsWithChangePage } from '../../types';
import { loginValidator } from '../../utils/validators';

export class LoginPageBlock extends Block {
    constructor(props: PropsWithChangePage) {
        super({
            events: {
                submit: (e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = loginValidator.validateForm(data as Record<string, string>);
                    if(!isValid){
                        console.log('Форма невалидны');
                        console.log('Ошибки:', loginValidator.getErrors());
                    }
                    else{
                        console.log('Форма валидны');
                        console.log('Данные формы:', data);
                        props.onChangePage('chat');
                    } 
                }
            },
            InputLogin: new FullInput({
                id: 'login-input',
                type: 'text',
                name: 'login',
                placeholder: 'enter login',
                label: 'Логин',
                validator: loginValidator,
            }),
            InputPassword: new FullInput({
                id: 'password-input',
                type: 'password',
                name: 'password',
                placeholder: 'enter password',  
                label: 'Пароль',
                validator: loginValidator,
            }),
            ButtonSing: new Button({
                id: 'sing-on-button',
                type: 'submit',
                content: 'Войти',
            }),
            LinkRegister: new Link({
                id: 'register-link',
                class: 'page-link',
                datapage: 'register',
                content: 'Нет аккаунта?',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();

                        props.onChangePage('register');
                    },
                },
            }),
            Footer: new Footer({
                onChangePage: props.onChangePage,
            }),
        });
    }

    override render(): string {
        return template;
    }
}




