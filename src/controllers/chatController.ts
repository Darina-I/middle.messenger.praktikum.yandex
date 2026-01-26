import { ChatAPI } from '../api/chatAPI';
import { AddUserData, CreateChatData, DeleteChatData, DeleteUsersData } from '../types/responseData';
import { apiError } from '../utils/apiError';

export class ChatController {
    private chatAPI = new ChatAPI();

    async createChat(createChatData: CreateChatData){
        try{
            await this.chatAPI.createChat(createChatData);

        } catch (error) {
            apiError(error);
        }
    }

    async getChats(){
        try{
            const response = await this.chatAPI.getChats();

            if(response.status === 200){
                return response;
            }
        } catch (error){
            apiError(error);
        }
    }

    async addUsers(addUserData: AddUserData){
        try{
            await this.chatAPI.addUser(addUserData);

        } catch(error) {
            apiError(error);
        }
    }

    async getToken(id: string){
        try{
            const response = await this.chatAPI.getToken(id);

            if(response.status === 200){
                return response;
            }
        } catch(error){
            apiError(error);
        }
    }

    async getUsers(chatId: string){
        try{
            const response = await this.chatAPI.getUsers(chatId);

            if(response.status === 200){
                return response;
            }
        } catch(error){
            apiError(error);
        }
    }

    async deleteUsers(deleteUsersData: DeleteUsersData){
        try{
            await this.chatAPI.deleteUsers(deleteUsersData);

        } catch(error){
            apiError(error);
        }
    }

    async deleteChat(deleteChatData: DeleteChatData){
        try{
            await this.chatAPI.deleteChat(deleteChatData);

        } catch(error){
            apiError(error);
        }
    }
};





