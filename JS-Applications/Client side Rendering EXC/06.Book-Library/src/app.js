import { render } from "./api/data.js"
import {  setupCreate } from "./create.js"
import { loadWholePage, setupCatalog } from "./catalog.js"
import {  } from "./update.js"

const body = document.querySelector('body')


const context = {
    update
}


function update(el) {
    render(el, body)
}

//on start Load
loadWholePage()