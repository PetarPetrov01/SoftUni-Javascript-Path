import * as carService from '../api/data.js'
import { html } from "../lib.js"
import { createSubmitHandler } from "../utils.js"

const createTemplate = (onSubmit) => html`
<section id="create-listing">
<div class="container">
    <form @submit=${onSubmit} id="create-form">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand">

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model">

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description">

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year">

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl">

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price">

        <hr>
        <input type="submit" class="registerbtn" value="Create Listing">
    </form>
</div>
</section>`

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v == '')) {
        return alert('all inputs must be filled!')
    }
    data.year = Number(data.year)
    data.price = Number(data.price)

    await carService.create(data)
    e.target.reset()
    ctx.page.redirect('/catalog')
}