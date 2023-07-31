import * as userService from './api/auth.js';
import { page } from './lib.js';
import { addRender, addSearch } from './middlewares/middlwares.js';
import { updateSession } from './middlewares/session.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
async function onLogout() {
    userService.logout();

    //Redirect to home
    page.redirect('/');
}