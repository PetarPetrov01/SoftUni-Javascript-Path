import * as productsService from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (productPromise) => html`
<h2>Products</h2>
    <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${until(productPromise, html`<h2>Loading &hellip;</h2>`)}
    </section>
    <!-- Display an h2 if there are no posts -->
    `;

const productTemplate = (product) => html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
</div>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadProducts(ctx)))
}

async function loadProducts(ctx) {
    const products = await productsService.getAll()

    return products.length > 0
        ? products.map(productTemplate)
        : html`<h2>No products yet.</h2>`
}