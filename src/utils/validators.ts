const validateName = (value: string): string => {
    const regex = /^[A-ZА-Я][a-zа-я-]*$/;
    return regex.test(value) ? '' : 'Латиница/кириллица, с заглавной буквы, без цифр, без спец. символов (кроме -), без пробелов';
};

const validatePassword = (value: string): string => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!*$#@]{8,40}$/;
    return regex.test(value) ? '' : '8-40 символов, хотя бы одна заглавная буква и цифра';
};

export const validators = {
    // first_name: (value: string): string => {
    //     const regex = /^[A-ZА-Я][a-zа-я-]*$/;
    //     return regex.test(value) ? '' : 'Латиница/кириллица, с заглавной буквы, без цифр, без спец. символов (кроме -), без пробелов';
    // },

    // second_name: (value: string): string => {
    //     const regex = /^[A-ZА-Я][a-zа-я-]*$/;
    //     return regex.test(value) ? '' : 'Латиница/кириллица, с заглавной буквы, без цифр, без спец. символов (кроме -), без пробелов';
    // },
    first_name: validateName,
    second_name: validateName,

    login: (value: string): string => {
        const regex = /^[a-zA-Z][a-zA-z-_0-9]{2,19}$/;
        return regex.test(value) ? '' : 'Латиница, 3-20 символов, не должен состоять полностью из цифр, без спец. символов (кроме -, _)';
    },

    email: (value: string): string => {
        const regex = /^[a-zA-Z0-9._*$%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        return regex.test(value) ? '' : 'Латиница, пример: example@ex.ex';
    },

    // password: (value: string): string => {
    //     const regex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!*$#@]{8,40}$/;
    //     return regex.test(value) ? '' : '8-40 символов, хотя бы одна заглавная буква и цифра';
    // },
    password: validatePassword,
    newPassword: validatePassword,

    repeatPassword: (value: string): string => {
        return value ? '' : 'Повторите пароль';
    },

    phone: (value: string): string => {
        const regex = /^[/+]?[0-9]{10,15}$/;
        return regex.test(value) ? '' : '10-15 цифр, может начинаться с +';
    },

    message: (value: string): string => {
        return value.trim() ? '' : 'Сообщение не должно быть пустым';
    }
};

export type FieldName = keyof typeof validators;

export class FormValidator {
    private errorFields: Record <string, string> = {};

    private PASSWORD_PAIRS: Record<string, string> = {
        repeatPassword: 'password',
        repeatNewPassword: 'newPassword'
    };

    validateField(fieldName: FieldName, value: string): string {
        let error = '';

        if(fieldName in this.PASSWORD_PAIRS){
            const passwordFieldId = this.PASSWORD_PAIRS[fieldName];
            const passwordField = document.getElementById(passwordFieldId) as HTMLInputElement;

            if(passwordField){
                error = this.validatePasswordMatch(passwordField.value, value);
            } else {
                error = validators[fieldName]?.(value);
            }
        } else {
            error = validators[fieldName]?.(value);
        }

        this.errorFields[fieldName] = error;
        return error;
    }

    validatePasswordMatch(password: string, repeatPassword: string): string {
        if (password !== repeatPassword) {
            const error = 'Пароли не совпадают';
            this.errorFields.repeatPassword = error;
            return error;
        }
        this.errorFields.repeatPassword = '';
        return '';
    }

    validateForm(formData: Record<string, string>): boolean{
        Object.keys(formData).forEach(field => {
            if(validators[field as FieldName]){
                this.validateField(field as FieldName, formData[field]);
            } else {
                this.errorFields[field] = '';
            }
        });

        if ('repeatPassword' in formData) {
            const password = formData.password;
            const repeatPassword = formData.repeatPassword;
            this.validatePasswordMatch(password, repeatPassword);
        }

        return Object.values(this.errorFields).every(error => error === '');
    }

    getErrors(): Record<string, string> {
        return this.errorFields;
    }
}

export const loginValidator = new FormValidator();
export const registerValidator = new FormValidator();
export const messageValidator = new FormValidator();
export const changePasswordValidator = new FormValidator();
export const profileValidator = new FormValidator();



