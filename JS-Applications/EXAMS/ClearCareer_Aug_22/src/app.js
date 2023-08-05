import * as userService from './api/auth.js';
import { page } from './lib.js';
import { updateSession } from './middlewares/session.js';
page(updateSession);
page(addRender);
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page.start();
async function onLogout() {
    userService.logout();

    //Redirect to home
    page.redirect('/');
}