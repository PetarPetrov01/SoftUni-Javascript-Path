import { getBySearch } from '../api/data.js';
import { html, until, nothing } from '../lib.js'
import { getUser } from '../utils.js';

const homeTemplate = (shoesPromise, onSubmit, ctx) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${(e) => onSubmit(e, ctx)} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
      
        <!-- Display an h2 if there are no posts -->
    ${until(shoesPromise, html`<p>Loading</p>`)}
        <!--  -->
    </div>
</section>`;

const resultTemplate = (shoes, user) => html`
    ${shoes.length > 0
        ? html`<ul class="card-wrapper">
            ${shoes.map((shoesPair) => shoesTemplate(shoesPair, user))}
            </ul>`
        : html`<h2>There are no results found.</h2 >`}`

const shoesTemplate = (shoes, user) => html`
<li class="card">
    <img src=${shoes.imageUrl} alt="eminem" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoes.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
    <p>${user ? html`${user._id}` : html`no user`}</p>
    ${user ? html`<a class="details-btn" href="/details/${shoes._id}">Details</a>` : nothing}
    
</li>`

export function searchPage(ctx) {
    ctx.render(homeTemplate(loadSearchedShoes(ctx), onSubmit, ctx))
    console.log('Home')
}

async function loadSearchedShoes(ctx) {
    const search = ctx.search || ''
    const user = getUser()

    const shoes = await getBySearch(search)
    return resultTemplate(shoes, user)
}

async function onSubmit(e, ctx) {
    e.preventDefault()
    const search = document.querySelector('[name="search"]').value.trim()
    if (search != '') {
        ctx.page.redirect(`/search?search=${search}`)
    }
}