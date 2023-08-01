import * as data from './api/data.js'
import { logout } from './api/auth.js';
import { page, render } from "./lib.js";
import { getUser } from './utils.js';
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

const root = document.querySelector('.container')
document.querySelector('#logoutBtn').addEventListener('click', onLogout)
page(decorate)
page('/index.html', '/')
page('/', catalogPage)
page('/catalog', catalogPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/create', createPage)
page('/my-furniture', catalogPage)
page('/login', loginPage)
page('/register', registerPage)

page.start()
updateNav()

function decorate(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav
    next()
}

async function onLogout() {
    await logout()
    updateNav()
    page.redirect('/')
}

function updateNav() {
    const user = getUser()
    if (user) {
        document.querySelector('#guest').style.display = 'none'
        document.querySelector('#user').style.display = 'inline-block'
    } else {
        document.querySelector('#guest').style.display = 'inline-block'
        document.querySelector('#user').style.display = 'none'
    }
}