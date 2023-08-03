import { html, render } from "../lib.js"

const navigationTemplate = (user) => html`
<nav>
    <img src="./images/headphones.png">
    <a href="/">Home</a>
    <ul>
        <!--All user-->
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        <!--Only guest-->
        ${user
        ? html`<li><a href="/create">Create Album</a></li>
                <li><a href="/logout">Logout</a></li>`
        : html`<li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>`}
        
                
    </ul >
</nav > `

const root = document.querySelector('#main-content')
const header = document.querySelector('#box header')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    render(navigationTemplate(ctx.user), header)
    ctx.render = ctxRender

    next()
}

