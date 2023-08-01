import * as data from './api/data.js'
import { getUser } from './utils.js';
const root = document.querySelector('.container')
document.querySelector('#logoutBtn').addEventListener('click', onLogout)
page(decorate)
page.start()
function decorate(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav
    next()
}
