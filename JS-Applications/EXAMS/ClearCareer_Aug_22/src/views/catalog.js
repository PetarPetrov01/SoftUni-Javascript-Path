import * as offerService from '../api/data.js'
import { html, until } from '../lib.js'

const catalogTemplate = (offerPromise) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
    <!-- Display a div with information about every post (if any)-->
    ${until(offerPromise, html`<p>Loading &hellip;</p>`)}
    <!-- Display an h2 if there are no posts -->
</section>`;

const offerTempalte = (offer) => html`
<div class="offer">
    <img src=${offer.imageUrl} alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${offer.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
</div>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadOffers(ctx)))
    console.log('catalog')
}

async function loadOffers(ctx) {
    const offers = await offerService.getAll()

    return offers.length > 0
        ? offers.map(offerTempalte) : html`<h2>No offers yet.</h2>`
}