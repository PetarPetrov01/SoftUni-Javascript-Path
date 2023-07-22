import * as carService from '../api/data.js'
import { html, until } from "../lib.js"

const myCarsTemplate = (carPromise) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        <!-- Display all records-->
        ${until(carPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`

const carsTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`

const noListingTemplate = () => html`<p class="no-cars"> You haven't listed any cars yet.</p>`

export function myCarsPage(ctx) {
    ctx.render(myCarsTemplate(loadCars(ctx)))
}

async function loadCars(ctx) {
    const userId = ctx.user._id
    const cars = await carService.getOwn(userId)

    return cars.length ? cars.map(carsTemplate) : noListingTemplate()
}