import { NewPasswordData, SearchUserData, UserData } from '../types/responseData';
import { BaseAPI } from './baseAPI';

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    updateProfile(data: UserData){
        return this.http.put('/profile', data);
    }

    updatePassword(data: NewPasswordData) {
        return this.http.put('/password', data);
    }

    updateAvatar(formData: FormData ) {
        return this.http.put('/profile/avatar', formData);
    }

    searchUser(data: SearchUserData) {
        return this.http.post('/search', data);
    }
};




