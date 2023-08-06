import { logout } from './api/auth.js';
import { page } from "./lib.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
page('/login', loginPage)
page('/register', registerPage)
page.start()
async function onLogout() {
    debugger
    logout()
    page.redirect('/')
}
