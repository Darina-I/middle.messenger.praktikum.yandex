import { Button } from '../../components/atoms/Button';
import { Footer } from '../../components/molecules/Footer';
import { FullInput } from '../../components/molecules/FullInput';
import { Link } from '../../components/atoms/Link';
import Block from '../../framework/Block';
import template from './registerUser.hbs?raw';
import { PropsWithChangePage } from '../../types';
import { registerValidator } from '../../utils/validators';

export class RegisterPageBlock extends Block {
    constructor(props: PropsWithChangePage) {
        super({
            InputEmail: new FullInput({
                id: 'email-input',
                type: 'email',
                name: 'email',
                placeholder: 'enter email',
                label: 'Почта',
                validator: registerValidator,
            }),
            InputLogin: new FullInput({
                id: 'login-input',
                type: 'text',
                name: 'login',
                placeholder: 'enter login',
                label: 'Логин',
                validator: registerValidator,
            }),
            InputFirstName: new FullInput({
                id: 'firstName-input',
                type: 'text',
                name: 'first_name',
                placeholder: 'enter first name',
                label: 'Имя',
                validator: registerValidator,
            }),
            InputSecondName: new FullInput({
                id: 'secondName-input',
                type: 'text',
                name: 'second_name',
                placeholder: 'enter second name',
                label: 'Фамилия',
                validator: registerValidator,
            }),
            InputPhone: new FullInput({
                id: 'phone-input',
                type: 'text',
                name: 'phone',
                placeholder: 'enter phone',
                label: 'Телефон',
                validator: registerValidator,
            }),
            InputPassword: new FullInput({
                id: 'password-input',
                type: 'password',
                name: 'password',
                placeholder: 'enter password',
                label: 'Пароль',
                validator: registerValidator,
            }),
            InputRepeatPassword: new FullInput({
                id: 'repeatPassword-input',
                type: 'password',
                name: 'repeatPassword',
                placeholder: 'enter password again',
                label: 'Пароль (еще раз)',
                validator: registerValidator,
            }),
            ButtonRegister: new Button({
                id: 'register-button',
                type: 'submit',
                content: 'Зарегистрироваться',
            }),
            LinkSign: new Link({
                id: 'sign-on-link',
                class: 'page-link',
                datapage: 'login',
                content: 'Войти',
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

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = registerValidator.validateForm(data as Record<string, string>);
                    if(!isValid){
                        console.log('Форма невалидны');
                        console.log('Ошибки:', registerValidator.getErrors());
                    }
                    else{
                        console.log('Форма валидны');
                        console.log('Данные формы:', data);
                        props.onChangePage('chat');
                    }                    
                }
            },
        });
    }

    override render(): string {
        return template;
    }
}






