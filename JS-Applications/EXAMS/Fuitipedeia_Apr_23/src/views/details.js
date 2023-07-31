import * as fruitService from '../api/data.js';
import { html, nothing, until } from '../lib.js'
import { getUser } from '../utils.js';

const detailsTemplate = (fruitPromise) => html`
<section id="details">
    <div id="details-wrapper">
        ${until(fruitPromise, html`<p>Loading</p>`)}
    </div>
</section>`;

const fruitTemplate = (fruit, isOwner, onDelete) => html`
<img id="details-img" src=${fruit.imageUrl} alt="example1" />
<p id="details-title">${fruit.name}</p>
<div id="info-wrapper">
    <div id="details-description">
        <p>${fruit.description}</p>
        <p id="nutrition">Nutrition</p>
        <p id="details-nutrition">${fruit.nutrition}</p>
    </div>
    <!--Edit and Delete are only for creator-->
    ${isOwner ? html`<div id="action-buttons">
        <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>` : nothing}
</div>`

export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadFruit(ctx)))
    console.log('details')
}

async function loadFruit(ctx) {
    const fruitId = ctx.params.id
    const user = getUser()
    const fruit = await fruitService.getFruitById(fruitId)

    const isOwner = user && user._id == fruit._ownerId

    return fruitTemplate(fruit, isOwner, onDelete)

    async function onDelete() {
        const dialog = confirm(`Are you sure you want to delete ${fruit.name}`)
        if (dialog) {
            await fruitService.deleteFruit(fruitId)
            ctx.page.redirect('/catalog')
        }
    }
}
