import { render, html } from './node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js'

const catLiTemplate = (cat) => html`<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="100">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>`

const ulTemplate = (cats) => html`
<ul>
    ${cats.map(catLiTemplate)}
</ul>`

document.querySelector('#allCats').addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        e.preventDefault()
        const statusEl = e.target.parentElement.querySelector('.status')


        if (statusEl.style.display == 'block') {
            statusEl.style.display = 'none'
            e.target.textContent = "Show status code"
        } else {
            statusEl.style.display = 'block'
            e.target.textContent = "Hide status code"
        }

    }
})
render(ulTemplate(cats), document.querySelector('#allCats'))
