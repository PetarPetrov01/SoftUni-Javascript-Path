import * as carService from "../api/data.js"
import { html, nothing, until } from "../lib.js"

const detailsTemplate = (carPromise) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        ${until(carPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`

const carTemplate = (car, isOwner, onDelete, ctx) => html`
<img src=${car.imageUrl}>
<hr>
<ul class="listing-props">
    <li><span>Brand:</span>${car.brand}</li>
    <li><span>Model:</span>${car.model}</li>
    <li><span>Year:</span>${car.year}</li>
    <li><span>Price:</span>${car.price} $</li>
</ul>

<p class="description-para">${car.description}</p>
${isOwner ? html`
<div class="listings-buttons">
    <a href=${`/edit/${car._id}`} class="button-list">Edit</a>
    <a @click=${() => onDelete(car._id, ctx)} href="#" class="button-list">Delete</a>
</div>` : nothing}`

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadCar(ctx)))
}

async function loadCar(ctx) {
    debugger
    const carId = ctx.params.id
    const user = ctx.user

    const car = await carService.getById(carId)

    const isOwner = user && user._id == car._ownerId

    return carTemplate(car, isOwner, onDelete, ctx)
}

async function onDelete(id, ctx) {
    //delete car
    const confirmation = confirm('Are you sure you want to delete this car?')
    if (confirmation) {
        await carService.deleteCar(id)
        console.log('Deleted...')
        ctx.page.redirect('/catalog')
    }
}