import { logout } from './api/auth.js';
import { page } from "./lib.js";

import { decorate } from './middlewares/middlwares.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { myTeamsPage } from './views/myTeams.js';
import { detailsPage } from './views/details.js';
import { updateSession } from './middlewares/session.js';
//import { memberControl } from './utils.js';

page(updateSession)
page(decorate)
page('/index.html', '/')
page('/', homePage)
page('/catalog', catalogPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/edit/:id', editPage)
page('/my-teams', myTeamsPage)
page('/details/:id', detailsPage)
//page('/members', memberControl)
page('/logout', onLogout)

page.start()

async function onLogout() {
    debugger
    logout()
    page.redirect('/')
}

