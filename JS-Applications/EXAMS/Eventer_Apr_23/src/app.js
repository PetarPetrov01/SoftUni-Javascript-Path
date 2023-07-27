import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage, onGoClick } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/logout', onLogout);
page('/going/:id', onGoClick)
