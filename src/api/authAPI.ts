import { SignInData, UserData } from '../types/responseData';
import { BaseAPI } from './baseAPI';

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: UserData){
        return this.http.post('/signup', data);
    }

    signin(data: SignInData){
        return this.http.post('/signin', data);
    }

    getUserInfo(){
        return this.http.get('/user');
    }

    logout(){
        return this.http.post('/logout');
    }
}




