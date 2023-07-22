import { render, html } from "../lib.js"

const navTemplate = (user) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/catalog">All Listings</a>
    <a href="/search">By Year</a>
    <!-- Guest users -->
    ${user
        ? html`<div id="profile">
        <a>Welcome ${user.username}</a>
        <a href="/my-cars">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
            </div>`
        : html` <div id = "guest" >
        <a href="/login">Login</a>
        <a href="/register">Register</a>
            </div > `}
    
    <!-- Logged users -->
    
</nav>`

const header = document.querySelector('header')
const root = document.querySelector('#site-content')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    const user = ctx.user

    render(navTemplate(user), header)
    ctx.render = ctxRender

    next()
}





