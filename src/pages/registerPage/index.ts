import { Button } from '../../components/atoms/Button';
import { FullInput } from '../../components/molecules/FullInput';
import { Link } from '../../components/atoms/Link';
import Block from '../../framework/Block';
import template from './registerUser.hbs?raw';
import { registerValidator } from '../../utils/validators';
import { AuthController } from '../../controllers/authController';
import { UserData } from '../../types/responseData';

export class RegisterPageBlock extends Block {
    private authController = new AuthController();

    constructor() {
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

                        window.router.go('/');
                    },
                },
            }),
            events: {
                submit: async(e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = registerValidator.validateForm(data as Record<string, string>);
                    if(!isValid){ return; }

                    const { repeatPassword, ...signupData } = data;
                    await this.authController.register(signupData as unknown as UserData);                
                }
            },
        });
    }

    override render(): string {
        return template;
    }
}






