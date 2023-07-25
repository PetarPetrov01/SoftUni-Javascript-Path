import { html, render } from "../lib.js"

const root = document.querySelector('#main-content')
const header = document.querySelector('#box header')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    //PASS ctx.user
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender

    next()
}


//Take user
const navTemplate = (user) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>
    <!-- Logged-in users -->
    ${user
        ? html`
        <div id="user">
            <a href="/create">Create Game</a>
            <a href="/logout">Logout</a>
        </div>`
        : html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`}
</nav >`
