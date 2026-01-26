//Request AUTH
export interface UserData {
    login: string;
    password: string;
    display_name?: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
}

export interface SignInData {
    login: string;
    password: string;
}

export interface NewPasswordData {
    oldPassword: string;
    newpassword: string;
}

//Request CHAT
export interface CreateChatData {
    title: string,
}

export interface SearchUserData {
    login: string,
}

export interface AddUserData {
    users: string,
    chatId: string,
}

export interface DeleteUsersData{
    users: string,
    chatId: string,
}

export interface DeleteChatData{
    chatId: string,
}

//WebSocket
export interface Message {
    id: string,
    time: string,
    user_id: string,
    content: string,
    type: string,
    date: string,
    fullDateTime: string,
}



