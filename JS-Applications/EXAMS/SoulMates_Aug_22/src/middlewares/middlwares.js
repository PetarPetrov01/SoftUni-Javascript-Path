import { html, render } from "../lib.js"

const navTempalte = (user) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/catalog">Dashboard</a>
    <a href="/search">Search</a>
  </div>

  ${user
        ? html`<div class="user">
    <a href="/create">Add Pair</a>
    <a href="/logout">Logout</a>
  </div>`
        : html`<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`}
  <!-- Logged-in users -->
    <!-- Guest users -->
</nav>`

const header = document.querySelector('header')
const root = document.querySelector('main')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    render(navTempalte(ctx.user), header)
    ctx.render = ctxRender

    next()
}

