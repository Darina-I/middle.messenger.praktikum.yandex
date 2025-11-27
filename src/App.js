import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Mocks from "./mockData.js";

import Input from "./components/atoms/Input.js";
import Button from "./components/atoms/Button.js";
import Link from "./components/atoms/Link.js";
import * as Organisms from "./components/organisms";
import * as Molecules from "./components/molecules";
import Footer from "./components/atoms/Footer.js";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("SearchInput", Molecules.SearchInput);
Handlebars.registerPartial("ListChats", Organisms.ListChats);
Handlebars.registerPartial("CurrentChat", Organisms.CurrentChat);
Handlebars.registerPartial("MessageInput", Molecules.MessageInput);
Handlebars.registerPartial("ChangeAvatar", Molecules.ChangeAvatar);
Handlebars.registerPartial("Footer", Footer);

export default class App{
    constructor() {
        this.state = {
            currentPage: "login",
            currentChatId: undefined,
            isEditProfile: false,
            isChangePassword: false,
            isOpenChangeAvatar: false,
        };
        this.appElement = document.getElementById("app");
    }

    render() {
        let template;
        let htmlString;

        if (this.state.currentPage === "login"){
            template = Handlebars.compile(Pages.LoginPage);
            htmlString = template({ login: "Darina", password: "Darina" });
        }
        else if (this.state.currentPage === "register"){
            template = Handlebars.compile(Pages.RegisterPage);
            htmlString = template({ user: Mocks.mockUser });
        }
        else if (this.state.currentPage === "chat"){
            let chatMessages;
            const chatId = this.state.currentChatId;
            if (chatId !== undefined){
                const currentChatMessages = Mocks.mockChats.find(item => item.id === chatId);
                if (currentChatMessages.chat){
                    chatMessages = currentChatMessages.chat;
                }
            }
            template = Handlebars.compile(Pages.ChatPage);
            htmlString = template({ chats: Mocks.mockChats, chatMessages: chatMessages });
        }
        else if (this.state.currentPage === "profile"){
            template = Handlebars.compile(Pages.ProfilePage);
            htmlString = template({ 
                user: Mocks.mockUserProfile, 
                isEditProfile: this.state.isEditProfile, 
                isChangePassword: this.state.isChangePassword,
                isOpenChangeAvatar: this.state.isOpenChangeAvatar });
        }
        else if (this.state.currentPage === "error500"){
            template = Handlebars.compile(Pages.ErrorPage);
            htmlString = template({ error: '500', content: 'Мы уже фиксим'})
        }
        else if (this.state.currentPage === "error404"){
            template = Handlebars.compile(Pages.ErrorPage);
            htmlString = template({ error: '404', content: 'Не туда попали'})
        }

        //Создание временного контейнера
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        this.appElement.textContent = "";
        Array.from(doc.body.childNodes).forEach(node => {
            this.appElement.appendChild(node);
        });

        this.attachEventListeners(); //подписка на events
    }

    attachEventListeners() {
        if (this.state.currentPage === "login"){
            const loginButton = document.getElementById("sing-on-button");

            loginButton.addEventListener("click", () => this.changePage("chat"));
        }
        else if (this.state.currentPage === "register"){
            const registerButton = document.getElementById("register-button");

            registerButton.addEventListener("click", () => this.changePage("chat"));
        }
        else if (this.state.currentPage === "chat"){
            const chatsCards = document.querySelectorAll(".chat__card");
            chatsCards.forEach(card => {
                card.addEventListener("click", () => {
                    const id = card.getAttribute("data-id");
                    this.changeChat(id);
                })
            });

        }
        else if (this.state.currentPage === "profile"){
            const backButton = document.getElementById("back-button");
            backButton.addEventListener("click", () => this.changePage("chat"));

            const showLinks = !(this.state.isEditProfile || this.state.isChangePassword);

            const avatarDiv = document.getElementById("avatar");
            avatarDiv.addEventListener("click", () => this.changeIsEditUserInfo("avatar", true))

            if(showLinks){
                const editLink = document.getElementById("change-info-link");
                editLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.changeIsEditUserInfo("infoUser", true);
                });

                const changePasswordLink = document.getElementById("change-password-link");
                changePasswordLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.changeIsEditUserInfo("password", true);
                });

            }
            else{
                if(this.state.isEditProfile){
                    const saveEditButton = document.getElementById("edit-button");
                    saveEditButton.addEventListener("click", () => this.changeIsEditUserInfo("infoUser", false));
                }
                else if (this.state.isChangePassword){
                    const saveNewPasswordButton = document.getElementById("change-password-button");
                    saveNewPasswordButton.addEventListener("click", () => this.changeIsEditUserInfo("password", false));
                }
            }

            if(this.state.isOpenChangeAvatar){
                const saveAvatarButton = document.getElementById("change-avatar-button");
                saveAvatarButton.addEventListener("click", () => this.changeIsEditUserInfo("avatar", false));
            }
        }

        const pageLinks = document.querySelectorAll(".page-link");
        pageLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(e.target.dataset.page);
            });
        });
    }

    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }

    changeChat(chatId){
        this.state.currentChatId = Number(chatId);
        this.render();
    }

    changeIsEditUserInfo(type, value){
        if(type === "infoUser"){
            this.state.isEditProfile = value;
        }
        else if (type === "password"){
            this.state.isChangePassword = value;
        }
        else if (type === "avatar"){
            this.state.isOpenChangeAvatar = value;
        }
        this.render(); 
    }
};



