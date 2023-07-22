import { page } from './lib.js'
import { logout } from './api/auth.js'
import { addRender } from './middlewares/middlwares.js'
import { updateSession } from './middlewares/session.js'

import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { myCarsPage } from './views/myCars.js'
import { registerPage } from './views/register.js'
import { searchPage } from './views/search.js'
import { addSearchQuery } from './utils.js'

page(updateSession)
page(addRender)
page(addSearchQuery)

page('/index.html', '/')
page('/', homePage)
page('/catalog', catalogPage)
page('/details/:id', detailsPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/edit/:id', editPage)
page('/my-cars', myCarsPage)
page('/search', searchPage)
page('/logout', onLogout)

page.start()

async function onLogout() {
    await logout()
    page.redirect('/')
}



