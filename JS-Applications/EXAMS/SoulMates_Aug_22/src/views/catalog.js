import { getAllShoes } from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (shoePromise) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    ${until(shoePromise, html`<p>Loading</p>`)}
    
</section>`;

const shoesTemplate = (shoes) => html`
${shoes.length > 0
        ? html`<ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
                ${shoes.map(shoeTemplate)}
                </ul>`
        : html`<h2>There are no items added yet.</h2>`}`

const shoeTemplate = (shoe) => html`
<li class="card">
    <img src=${shoe.imageUrl} alt="eminem" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadShoes(ctx)))
    console.log('catalog')
}

async function loadShoes(ctx) {
    const shoes = await getAllShoes()
    return shoesTemplate(shoes)
}