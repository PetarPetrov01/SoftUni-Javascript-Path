import { render } from "../lib.js"

export function decorate(ctx, next) {
    const root = document.querySelector('main')
    ctx.render = (content) => render(content, root)
    
    updateNav(ctx, next)
    next()
}

export function updateNav(ctx, next) {

    const user = ctx.user

    if (user) {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none')
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block')
    } else {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block')
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none')
    }

    next()
}
