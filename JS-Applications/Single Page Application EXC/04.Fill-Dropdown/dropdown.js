import { getTowns, postTown } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const optionsTemplate = (town) => html`<option value=${town._id}>${town.text}</option>`

const selectMenu = document.querySelector('#menu')
async function update() {
    const towns = Object.values(await getTowns())
    render(towns.map(optionsTemplate), selectMenu)
}

update()
const form = document.querySelector('form')
form.addEventListener('submit', addItem)

function addItem(e) {
    e.preventDefault()
    const text = document.querySelector('#itemText').value.trim()
    if (text == '') {
        return
    }
    postTown({ text })
    form.reset()
    update()
}