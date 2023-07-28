import { html, render } from "../lib.js"



const root = document.querySelector('#wrapper main')
const header = document.querySelector('#wrapper header')

function ctxRender(content) {
    render(content, root)
}

export function addRender(ctx, next) {
    ctx.render = ctxRender

    next()
}



