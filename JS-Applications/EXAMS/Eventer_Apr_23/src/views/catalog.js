import { getAllEvents } from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (eventPromise) => html`
<h2>Current Events</h2>
<section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
    ${until(eventPromise, html`<p>loading</p>`)}
</section>`;

const eventTemplate = (event) => html`
<div class="event">
    <img src=${event.imageUrl} alt="example1" />
    <p class="title">${event.name}</p>
    <p class="date">${event.date}</p>
    <a class="details-btn" href="/details/${event._id}">Details</a>
</div>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadEvents(ctx)))
    console.log('catalog')
}

async function loadEvents(ctx) {
    const events = await getAllEvents()

    return events.length
        ? events.map(eventTemplate)
        : html`<h4>No Events yet.</h4>`
}