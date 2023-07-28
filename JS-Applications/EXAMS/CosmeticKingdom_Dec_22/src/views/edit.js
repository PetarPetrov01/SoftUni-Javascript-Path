import * as productsService from '../api/data.js'
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (productPromise, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form @submit=${onSubmit} class="edit-form">
        ${until(productPromise, html`<h2>Loading &hellip;</h2>`)}
        </form>
    </div>
</section>`;

const editFormTemplate = (product) => html`
<input type="text" name="name" id="name" placeholder="Product Name" .value=${product.name} />
<input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${product.imageUrl} />
<input type="text" name="category" id="product-category" placeholder="Category" .value=${product.category} />
<textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50" .value=${product.description}></textarea>
<input type="text" name="price" id="product-price" placeholder="Price" .value=${product.price} />
<button type="submit">post</button>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadProduct(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadProduct(ctx) {
    debugger
    const productId = ctx.params.id
    const product = await productsService.getById(productId)

    return editFormTemplate(product)
}

async function onSubmit(ctx, data, e) {
    const productId = ctx.params.id
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }
    try {
        await productsService.editProduct(productId, data)
        ctx.page.redirect('/catalog')
        e.target.reset()
    } catch (error) {
        alert(error.message)
    }

}

// <input type="text" name="name" id="name" placeholder="Product Name" .value=${product.name}/>
// <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${product.imageUrl}/>
// <input type="text" name="category" id="product-category" placeholder="Category" .value=${product.category}/>
// <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50".value=${product.description}></textarea>
// <input type="text" name="price" id="product-price" placeholder="Price" .value=${product.price}/>
// <button type="submit">post</button>