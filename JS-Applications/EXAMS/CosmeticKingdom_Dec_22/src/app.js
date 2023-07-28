import * as userService from './api/auth.js';

import { page } from './lib.js';
import { addRender } from './middlewares/middlwares.js';
import { updateSession } from './middlewares/session.js';

//All views imports

page(updateSession)
page(addRender);


//initiliaze
page.start();

async function onLogout() {
    userService.logout();

    //Redirect to home
    page.page.redirect('/');
}