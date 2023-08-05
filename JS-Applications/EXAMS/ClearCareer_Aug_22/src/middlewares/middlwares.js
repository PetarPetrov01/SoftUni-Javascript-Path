import { html, render } from "../lib.js"

const root = document.querySelector('main')
const header = document.querySelector('#wrapper header')

const navTemplate = (user) => html`
 <!-- Navigation -->
<a id="logo" href="/">
    <img id="logo-img" src="./images/logo.jpg" alt="" />
</a>
<nav>
    <div>
    <a href="/catalog">Dashboard</a>
    </div>
    <!-- Logged-in users -->
    ${user
        ? html`<div class="user">
        <a href="/create">Create Offer</a>
        <a href="/logout">Logout</a>
        </div>`
        : html`<div class="guest" >
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        </div > `}
        <!--Guest users-->
    </nav > `

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender

    next()
}


