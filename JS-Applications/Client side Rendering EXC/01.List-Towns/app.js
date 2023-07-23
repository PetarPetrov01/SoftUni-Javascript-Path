import { render, html } from './node_modules/lit-html/lit-html.js'

const listTemplate = (towns) => html`
<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`

document.querySelector('#btnLoadTowns').addEventListener('click', (e) => {
    e.preventDefault()
    const input = document.querySelector("#towns")
    const towns = input.value.split(', ')

    render(listTemplate(towns), document.querySelector('#root'))
    input.value = ''
})