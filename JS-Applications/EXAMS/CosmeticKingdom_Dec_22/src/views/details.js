import * as productsService from '../api/data.js';
import { html, nothing, until } from '../lib.js'

const detailsTemplate = (productPromise) => html`
<section id="details">
    <div id="details-wrapper">
        ${until(productPromise, html`<h2>Loading &hellip;</h2>`)}
    </div>
</section>`;

const productTemplate = (product, isOwner, onDelete, buys, user, hasBought) => html`
<img id="details-img" src=${product.imageUrl} alt="example1" />
<p id="details-title">${product.name}</p>
<p id="details-category">Category: <span id="categories">${product.category}</span></p>
<p id="details-price">Price: <span id="price-number">${product.price}</span>$</p>
<div id="info-wrapper">
<div id="details-description">
    <h4>Bought: <span id="buys">${buys} </span> times.</h4>
    <span>${product.description}</span>
</div>
</div>

<!--Edit and Delete are only for creator-->
${isOwner ? html`<div id="action-buttons">
<a href="/edit/${product._id}" id="edit-btn">Edit</a>
<a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}


<!--Bonus - Only for logged-in users ( not authors )-->
${user && isOwner == false && hasBought == false
        ? html`<a href="/buy/${product._id}" id="buy-btn">Buy</a></div>`
        : nothing}`

export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadProduct(ctx)))
    console.log('details')
}

async function loadProduct(ctx) {
    const productId = ctx.params.id
    const user = ctx.user
    const product = await productsService.getById(productId)
    const buys = await productsService.getBoughtCount(productId)
    const hasBought = user
        ? await productsService.getBuysForUser(productId, user._id)
        : false

    console.log(buys)
    console.log(hasBought)

    const isOwner = user && user._id == product._ownerId

    return productTemplate(product, isOwner, onDelete, buys, user, hasBought)

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete product "${product.name}"`)
        if (confirmed) {
            await productsService.deleteProduct(productId)
            ctx.page.redirect('/catalog')
        }
    }
}

export async function buyProdcut(ctx) {
    debugger
    const productId = ctx.params.id

    try {
        const bought = await productsService.buy({ productId })
        console.log(bought)
        ctx.page.redirect(`/details/${productId}`)
    } catch (error) {
        alert(error.message)
    }
}

