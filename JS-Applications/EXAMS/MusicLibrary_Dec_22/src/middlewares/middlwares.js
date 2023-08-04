import { html, render } from "../lib.js"


const navTemplate = (user) => html`
<!-- Navigation -->
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/catalog">Dashboard</a>
  </div>
  <!-- Logged-in users -->
  ${user
        ? html`<div class="user">
            <a href="/create">Add Album</a>
            <a href="/logout">Logout</a>
            </div>`
        : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
             </div>`}
  <!-- Guest users -->
  
</nav>`

const root = document.querySelector('main')
const header = document.querySelector('header')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender

    next()
}


