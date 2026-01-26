import { UserAPI } from '../api/userAPI';
import { NewPasswordData, SearchUserData, UserData } from '../types/responseData';
import { apiError } from '../utils/apiError';

export class UserController {
    private userAPI = new UserAPI();

    async updateUser(updateUserData: UserData){
        try{
            const response = await this.userAPI.updateProfile(updateUserData);

            if(response.status === 200){
                return response;
            }
        } catch (error){
            apiError(error);
        }
    }

    async updatePassword(updatePasswordData: NewPasswordData){
        try{
            await this.userAPI.updatePassword(updatePasswordData);

        } catch (error){
            apiError(error);
        }
    }

    async updateAvatar(avatarFormData: FormData){
        try{ 
            await this.userAPI.updateAvatar(avatarFormData);

        } catch (error){
            apiError(error);
        }
    }

    async searchUser(searchUserData: SearchUserData){
        try{
            const response = await this.userAPI.searchUser(searchUserData);

            if(response.status === 200){
                return response;
            }
        } catch (error) {
            apiError(error);
        }
    }
};




