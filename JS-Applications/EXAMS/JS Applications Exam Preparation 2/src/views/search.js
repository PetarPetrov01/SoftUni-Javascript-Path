import * as carService from '../api/data.js'
import { html, until } from "../lib.js"

const searchTemplate = (carPromise, onSearch, ctx) => html`
<section id="search-cars">
<h1>Filter by year</h1>
<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button @click=${(e) => onSearch(e, ctx)} class="button-list">Search</button>
</div>
<h2>Results:</h2>
<div class="listings">
    <!-- Display all records -->
    ${until(carPromise, html`<p>Loading &hellip;</p>`)}
    <!-- Display if there are no matches -->
</div>
</section>`;
const carTemplate = (car) => html`
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
</div>`;

const noMatchTemplate = () => html`<p class="no-cars"> No results.</p>`;

export function searchPage(ctx) {
    ctx.render(searchTemplate(loadCars(ctx), onSearch, ctx));
}

async function loadCars(ctx) {
    const search = ctx.search || '';

    let cars;
    if (search != '') {
        cars = await carService.getBySearch(search);
    } else {
        cars = await carService.getAll();
    };

    return cars.length > 0 ? cars.map(carTemplate) : noMatchTemplate();
}

async function onSearch(e, ctx) {
    e.preventDefault();
    const search = document.querySelector('.container [name="search"]').value.trim();
    if (search != ''){
        ctx.page.redirect('/search?search=' + search);
    }
}

