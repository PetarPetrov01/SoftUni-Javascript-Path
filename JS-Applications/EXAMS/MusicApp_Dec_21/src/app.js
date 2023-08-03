import * as userService from './api/auth.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page(updateSession);
page(addRender);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page.start();

async function onLogout() {
    userService.logout();

    //Redirect to home
    page.redirect('/');
}