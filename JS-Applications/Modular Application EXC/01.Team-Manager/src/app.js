import { logout } from './api/auth.js';
import { page } from "./lib.js";
import { decorate } from './middlewares/middlwares.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { myTeamsPage } from './views/myTeams.js';
page(updateSession)
page(decorate)
page('/index.html', '/')
page('/', homePage)
page('/catalog', catalogPage)
page('/login', loginPage)
page('/register', registerPage)
page('/my-teams', myTeamsPage)
page('/logout', onLogout)

page.start()

async function onLogout() {
    debugger
    logout()
    page.redirect('/')
}
