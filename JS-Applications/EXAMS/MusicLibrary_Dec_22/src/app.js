import * as userService from './api/auth.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page('/login', loginPage);
page('/register', registerPage);
page.start();
async function onLogout() {
    userService.logout();

    //Redirect to home
    page.redirect('/');
}