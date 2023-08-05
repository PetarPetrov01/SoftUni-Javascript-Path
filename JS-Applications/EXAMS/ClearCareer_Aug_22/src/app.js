import * as userService from './api/auth.js';

import { page } from './lib.js';
import { addRender } from './middlewares/middlwares.js';
import { updateSession } from './middlewares/session.js';

//All views imports
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage, onApply } from './views/details.js';
import { editPage } from './views/edit.js';
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
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/logout', onLogout);
page('/apply/:id', onApply)

//initiliaze
page.start();

async function onLogout() {
    userService.logout();

    //Redirect to home
    page.redirect('/');
}