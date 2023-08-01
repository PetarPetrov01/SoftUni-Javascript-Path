import * as data from './api/data.js'
import { logout } from './api/auth.js';
import { page, render } from "./lib.js";
import { getUser } from './utils.js';
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { registerPage } from './views/register.js';
const root = document.querySelector('.container')
document.querySelector('#logoutBtn').addEventListener('click', onLogout)
page(decorate)
page('/index.html', '/')
page('/', catalogPage)
page('/catalog', catalogPage)
page('/login', loginPage)
page('/register', registerPage)
page.start()
function decorate(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav
    next()
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