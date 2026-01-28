import { AuthController } from './controllers/authController';
import Router from './framework/router';
import { ChatPageBlock } from './pages/chatPage';
import { Error404Page, Error500Page } from './pages/errorPage';
import { LoginPageBlock } from './pages/loginPage';
import { ProfilePageBlock } from './pages/profilePage';
import { RegisterPageBlock } from './pages/registerPage';

document.addEventListener('DOMContentLoaded', async() => {
    const authController = new AuthController();
    

    const userData = await authController.getUser();
    const isAuthenticated = !!userData?.response;

    const router = new Router('#app');

    router
        .use('/', isAuthenticated ? ChatPageBlock : LoginPageBlock)
        .use('/sign-up', isAuthenticated ? ChatPageBlock : RegisterPageBlock)
        .use('/settings', ProfilePageBlock)
        .use('/messenger', ChatPageBlock)
        .use('/error404', Error404Page)
        .use('/error500', Error500Page)
        .start();

    window.router = router;
});

