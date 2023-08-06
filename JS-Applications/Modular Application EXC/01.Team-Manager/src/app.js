import { logout } from './api/auth.js';
import { page } from "./lib.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page(updateSession)
page(decorate)
page('/index.html', '/')
page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/logout', onLogout)
page.start()
async function onLogout() {
    debugger
    logout()
    page.redirect('/')
}
