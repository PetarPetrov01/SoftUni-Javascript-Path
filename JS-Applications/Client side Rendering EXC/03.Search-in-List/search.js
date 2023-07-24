import { html, render } from './node_modules/lit-html/lit-html.js'
import { towns as townNames } from './towns.js'

const townsTemplate = (towns) => html`
<ul>${towns.map((town) => html`<li class=${town.match ? "active" : ""}>${town.name}</li>`)}</ul>`

const towns = townNames.map(t => ({ name: t, match: false }))

const root = document.querySelector('#towns')
const input = document.querySelector("#searchText")
const output = document.querySelector("#result")

document.querySelector('button').addEventListener('click', search)

update()
function search() {
   const match = input.value
   let matches = 0;
   towns.forEach(t => {
      if (match && t.name.includes(match)) {
         t.match = true
         matches++
      } else {
         t.match = false
      }
   })

   output.textContent = `${matches} matches found`

   update()
}

function update() {
   render(townsTemplate(towns), root)
}
