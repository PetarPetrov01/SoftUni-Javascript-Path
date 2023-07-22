import { page } from './lib.js'
import { logout } from './api/auth.js'



page.start()

async function onLogout() {
    await logout()
    page.redirect('/')
}



