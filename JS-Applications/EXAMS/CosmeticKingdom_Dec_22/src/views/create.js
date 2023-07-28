import * as productService from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const createTemplate = (onSubmit) => html`
<section id="create">
<div class="form">
    <h2>Add Product</h2>
    <form @submit=${onSubmit} class="create-form">
    <input type="text" name="name" id="name" placeholder="Product Name" />
    <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
    <input type="text" name="category" id="product-category" placeholder="Category" />
    <textarea id="product-description" name="description" placeholder="Description" rows="5"
        cols="50"></textarea>

    <input type="text" name="price" id="product-price" placeholder="Price" />

    <button type="submit">Add</button>
    </form>
</div>
</section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
    console.log('create')
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    await productService.createProduct(data)
    ctx.page.redirect('/catalog')
    e.target.reset()
}