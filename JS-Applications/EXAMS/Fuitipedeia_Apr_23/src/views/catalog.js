import { getAll } from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (fruitPromise) => html`
<h2>Fruits</h2>
<!-- Display a div with information about every post (if any)-->
${until(fruitPromise, html`<p>Loading</p>`)}`;

const fruitCatalog = (fruit) => html`
<section id="dashboard">
    <div class="fruit">
        <img src=${fruit.imageUrl} alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/details/${fruit._id}">More Info</a>
    </div>
</section>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadFruits(ctx)))
    console.log('catalog')
}

async function loadFruits(ctx) {
    const fruits = await getAll()

    return fruits.length > 0
        ? fruits.map(fruitCatalog)
        : html`<h2>No fruit info yet.</h2>`
}