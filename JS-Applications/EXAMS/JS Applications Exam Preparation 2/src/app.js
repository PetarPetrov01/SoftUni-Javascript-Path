import { page } from './lib.js'
import { logout } from './api/auth.js'


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



