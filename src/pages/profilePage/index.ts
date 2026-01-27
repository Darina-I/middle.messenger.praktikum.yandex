import { Button } from '../../components/atoms/Button';
import { FullInput } from '../../components/molecules/FullInput';
import { Link } from '../../components/atoms/Link';
import { ChangeAvatarBlock } from '../../components/molecules/ChangeAvatar';
import Block from '../../framework/Block';
import template from './profileUser.hbs?raw';
import { mockUserProfile } from '../../mockData';
import { profileValidator, changePasswordValidator } from '../../utils/validators';
import { AuthController } from '../../controllers/authController';
import { NewPasswordData, UserData } from '../../types/responseData';
import { UserController } from '../../controllers/userController';

export class ProfilePageBlock extends Block {
    private authController = new AuthController();
    private userController = new UserController();

    public loadUserData(userData: Record<string, any>): void {
        const avatar = userData.avatar || '';

        const mappedUser = Object.entries(userData)
            .filter(([name]) => name !== 'avatar' && name !== 'id')
            .map(([name, value]) => {
                const inputName = mockUserProfile.find((field) => field.name === name)?.inputName;
                return {
                    name,
                    value: value && String(value),
                    inputName,
                    inputKey: `Input_${inputName}`
                };
            });

        mappedUser.forEach(({ value, inputName }) => {
            const inputKey = `Input_${inputName}`;
            const input = this.children[inputKey] as FullInput;
            if (input && value) {
                input.setValue(String(value));
            }
        });

        this.children.ChangeAvatar = new ChangeAvatarBlock({
            closePopup: () => this.setProps({ isOpenChangeAvatar: false }),
        });

        this.setProps({ user: mappedUser, currentAvatar: avatar });
    }

    constructor() {

        const inputs: Record<string, FullInput> = {};

        mockUserProfile.forEach((field) => {
            const key = `Input_${field.inputName}`;
            inputs[key] = new FullInput({
                id: field.name,
                class: 'edit-profile__input',
                type: 'text',
                name: field.name,
                placeholder: field.inputName,
                value: '',
                validator: profileValidator,
            });
        });

        super({
            user: mockUserProfile,
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
                id: 'repeatNewPassword',
                class: 'edit-profile__input',
                type: 'password',
                name: 'repeatNewPassword',
                placeholder: 'Повторите новый пароль',
                validator: changePasswordValidator,
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
                    click: async(e: Event) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await this.authController.logout();
                    },
                },
            }),
            events: {
                submit: async(e: Event) => {
                    e.preventDefault();
                    const submitButton = (e.target as HTMLElement).querySelector('button[type="submit"]:focus');
                    const buttonId = submitButton?.id;
                    const validator = buttonId === 'edit-button' ? profileValidator : changePasswordValidator;

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    const isValid = validator.validateForm(data as Record<string, string>);

                    if(!isValid){ return; }

                    if(buttonId === 'edit-button'){
                        const userResponse = await this.userController.updateUser(data as unknown as UserData);
                        this.setProps({ isEditProfile: false }); 
                        if(userResponse?.response){
                            let userData;
                            try{
                                userData = JSON.parse(userResponse.response);
                            } catch(error){
                                console.error('Ошибка в парсинге JSON-ответа', error);
                                return;
                            }

                            this.loadUserData(userData);   
                        }
                    }
                    else if(buttonId === 'change-password-button'){
                        const { repeatNewPassword, ...updatePasswordData } = data;
                        await this.userController.updatePassword(updatePasswordData as unknown as NewPasswordData);
                        this.setProps({ isChangePassword: false }); 
                    }
                },
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    if(target.closest('#avatar')){
                        this.setProps({ isOpenChangeAvatar: true });
                    }

                    if (target.closest('#back-button')) {
                        window.router.go('/messenger');
                    }
                },
            }
        });

        this.authController.getUser().then((userResponse) => {
            if(userResponse?.response){
                const userData = JSON.parse(userResponse.response);
                this.loadUserData(userData);   
            }
        }).catch((error) => {
            console.error('Ошибка загрузки:', error);
        });
    }

    override render(): string {
        return template;
    }


}





