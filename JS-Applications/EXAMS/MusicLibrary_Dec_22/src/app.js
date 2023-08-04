import * as userService from './api/auth.js';
import { page } from './lib.js';
import { addRender } from './middlewares/middlwares.js';
import { updateSession } from './middlewares/session.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage, onLike } from './views/details.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page(updateSession);
page(addRender);
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/logout', onLogout);
page.start();
async function onLogout() {
    userService.logout();

    //Redirect to home
    page.redirect('/');
}