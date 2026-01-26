import { AddUserData, CreateChatData, DeleteUsersData, DeleteChatData } from '../types/responseData';
import { BaseAPI } from './baseAPI';

export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats(){
        return this.http.get('');
    }

    createChat(data: CreateChatData){
        return this.http.post('', data);
    }

    addUser(data: AddUserData){
        return this.http.put('/users', data);
    }

    getToken(id: string){
        return this.http.post(`/token/${id}`);
    }

    getUsers(chatId: string){
        return this.http.get(`/${chatId}/users`);
    }

    deleteUsers(data: DeleteUsersData){
        return this.http.delete('/users', data);
    }

    deleteChat(data: DeleteChatData){
        return this.http.delete('/', data);
    }
}




