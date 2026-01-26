import { Button } from '../../components/atoms/Button';
import { FullInput } from '../../components/molecules/FullInput';
import { Link } from '../../components/atoms/Link';
import Block from '../../framework/Block';
import template from './loginUser.hbs?raw';
import { loginValidator } from '../../utils/validators';
import { AuthController } from '../../controllers/authController';
import { SignInData } from '../../types/responseData';

export class LoginPageBlock extends Block {
    private authController = new AuthController();

    constructor() {
        super({
            events: {
                submit: async(e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = loginValidator.validateForm(data as Record<string, string>);
                    if(!isValid){
                        return;
                    }

                    await this.authController.login(data as unknown as SignInData);
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
                        window.router.go('/sign-up');
                    },
                },
            })
        });
    }

    override render(): string {
        return template;
    }
}




