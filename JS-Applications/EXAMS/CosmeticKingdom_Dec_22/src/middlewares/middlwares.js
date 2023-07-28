import { html, render } from "../lib.js"


const navTemplate = (user) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
  <div>
    <a href="/catalog">Products</a>
  </div>
  ${user
        ? html`<!-- Logged-in users -->
    <div class="user">
        <a href="/create">Add Product</a>
        <a href="/logout">Logout</a>
    </div>`
        : html`<!-- Guest users -->
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`

const root = document.querySelector('#wrapper main')
const header = document.querySelector('#wrapper header')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender

    next()
}



