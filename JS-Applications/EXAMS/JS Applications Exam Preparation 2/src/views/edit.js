import * as carService from '../api/data.js'
import { html, until } from "../lib.js"
import { createSubmitHandler } from "../utils.js"

const editTemplate = (carPromise, onSubmit) => html`
<section id="edit-listing">
<div class="container">
    <form @submit=${onSubmit} id="edit-form">
        ${until(carPromise, html`<p>loading &hellip;</p>`)}
    </form>
</div>
</section>`

const carTemplate = (car) => html`
<h1>Edit Car Listing</h1>
<p>Please fill in this form to edit an listing.</p>
<hr>

<p>Car Brand</p>
<input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

<p>Car Model</p>
<input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

<p>Description</p>
<input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

<p>Car Year</p>
<input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

<p>Car Image</p>
<input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

<p>Car Price</p>
<input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

<hr>
<input type="submit" class="registerbtn" value="Edit Listing">`

export function editPage(ctx) {
    ctx.render(editTemplate(loadCar(ctx), createSubmitHandler(ctx, onSubmit)))
}

async function loadCar(ctx) {
    const carId = ctx.params.id
    const car = await carService.getById(carId)

    return carTemplate(car)
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v == '')) {
        return alert('all inputs must be filled!')
    }
    data.year = Number(data.year)
    data.price = Number(data.price)

    await carService.editCar(ctx.params.id, data)
    e.target.reset()
    ctx.page.redirect(`/details/${ctx.params.id}`)
}

