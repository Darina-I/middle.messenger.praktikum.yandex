import { AuthAPI } from '../api/authAPI';
import { SignInData, UserData } from '../types/responseData';
import { apiError } from '../utils/apiError';

export class AuthController {
    private authAPI = new AuthAPI();

    async register(signupData: UserData){
        try{
            const response = await this.authAPI.signup(signupData);

            if(response.status === 200){
                window.router.go('/messenger');
            }
        } catch(error) {
            apiError(error);
        } 
    }

    async login(signinData: SignInData){
        try{
            const response = await this.authAPI.signin(signinData);

            if(response.status === 200){
                window.router.go('/messenger');
            }
        } catch(error) {
            apiError(error);
        } 
    }

    async getUser(){
        try{
            const response = await this.authAPI.getUserInfo();

            if(response.status === 200){
               return response; 
            }
        } catch(error) {
            apiError(error);
        }
    }

    async logout(){
        try{
            const response = await this.authAPI.logout();

            if(response.status === 200){
                window.router.go('/');
            }
        } catch(error) {
            apiError(error);
        }
    }
}




