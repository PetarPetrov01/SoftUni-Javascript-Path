import * as fruitService from '../api/data.js'
import { html, until } from "../lib.js";
import { createSubmitHandler } from '../utils.js';

const searchTemplate = (fruitPromise, onSearch, ctx) => html`
<section id="search">
    <div class="form">
    <h2>Search</h2>
    <form @submit=${(e) => onSearch(ctx, e)} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
    ${until(fruitPromise)}
    
    <!--If there are matches display a div with information about every fruit-->
    </div>
</section>`

const foundFruitTempalte = (fruit) => html`
 <div class="fruit">
    <img src=${fruit.imageUrl} alt="example1" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`;

export function searchPage(ctx) {
    ctx.render(searchTemplate(loadSearch(ctx), onSearch, ctx))
}

async function loadSearch(ctx) {
    
    const search = ctx.search || '';

    const fruits = search == ''
        ? await fruitService.getAll()
        : await fruitService.getBySearch(search)

    return fruits.length > 0
        ? fruits.map(foundFruitTempalte)
        : html`<p class="no-result">No result.</p>`

}

async function onSearch(ctx, e) {
    
    e.preventDefault()
    const search = document.querySelector('[name=search]').value.trim()
    if (search != '') {
        ctx.page.redirect(`/search?search=${search}`)
    }
}