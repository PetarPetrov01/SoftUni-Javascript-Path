import { getAllFacts } from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (factsPromise) => html`
<h2>Fun Facts</h2>
${until(factsPromise, html`<p>Loading</p>`)}`;

const factsTemplate = (facts) => html`
${facts.length > 0
        ? html` <section id="dashboard">
            ${facts.map(factTemplate)}
          <!-- Display a div with information about every post (if any)-->
        </section>  `
        : html`<h2>No Fun Facts yet.</h2>`}`

const factTemplate = (fact) => html`
<div class="fact">
    <img src=${fact.imageUrl} alt="example1" />
    <h3 class="category">${fact.category}</h3>
    <p class="description">${fact.description}</p>
    <a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadFacts(ctx)))
    console.log('catalog')
}

async function loadFacts(ctx) {
    const facts = await getAllFacts()

    return factsTemplate(facts)
}