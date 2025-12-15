import * as Mocks from './mockData.js';

import { LoginPageBlock } from './pages/loginPage';
import { RegisterPageBlock } from './pages/registerPage';
import { ChatPageBlock } from './pages/chatPage';
import { ErrorPageBlock } from './pages/errorPage/index.js';
import { ProfilePageBlock } from './pages/profilePage/index.js';

type PageName = 'login' | 'register' | 'chat' | 'profile' | 'error500' | 'error404';

interface AppState {
    currentPage: PageName;
    currentChatId: number | undefined;
}

export default class App{
    private state: AppState;
    private appElement: HTMLElement | null;

    constructor() {
        this.state = {
            currentPage: 'login',
            currentChatId: undefined,
        };
        this.appElement = document.getElementById('app');
    }

    render(): void {

        if (!this.appElement) return;
        switch (this.state.currentPage){
            case 'login':
                const loginPage = new LoginPageBlock({
                    onChangePage: (page: string) => this.changePage(page as PageName),
                });
                this.appElement.replaceChildren(loginPage.getContent());
                break;

            case 'register':
                const registerPage = new RegisterPageBlock({
                    onChangePage: (page: string) => this.changePage(page as PageName),
                });
                this.appElement.replaceChildren(registerPage.getContent());
                break;

            case 'chat':
                let chatMessages;
                const chatId = this.state.currentChatId;
                if (chatId !== undefined){
                    const currentChatMessages = Mocks.mockChats.find(item => item.id === chatId);
                    if (currentChatMessages?.chat){
                        chatMessages = currentChatMessages.chat;
                    }
                }
                const chatPage = new ChatPageBlock({
                    chatMessages: chatMessages,
                    onChangePage: (page: string) => this.changePage(page as PageName),
                    onChangeChat: (chatId: string) => {
                        console.log('change');
                        this.changeChat(Number(chatId));
                    },
                });
                this.appElement.replaceChildren(chatPage.getContent());
                break;
            case 'profile':
                const profilePage = new ProfilePageBlock({
                    onChangePage: (page: string) => this.changePage(page as PageName),
                });
                this.appElement.replaceChildren(profilePage.getContent());
                break;

            case 'error500':
                const error500Page = new ErrorPageBlock({
                    onChangePage: (page: string) => this.changePage(page as PageName),
                    error: '500',
                    content: 'Мы уже фиксим'
                });
                this.appElement.replaceChildren(error500Page.getContent());
                break;

            case 'error404':
                const error404Page = new ErrorPageBlock({
                    onChangePage: (page: string) => this.changePage(page as PageName),
                    error: '404',
                    content: 'Не туда попали'
                });
                this.appElement.replaceChildren(error404Page.getContent());
                break;
        }
    }

    changePage(page: PageName): void {
        this.state.currentPage = page;
        this.render();
    }

    changeChat(chatId: number): void {
        this.state.currentChatId = chatId;
        this.render();
    }
};



