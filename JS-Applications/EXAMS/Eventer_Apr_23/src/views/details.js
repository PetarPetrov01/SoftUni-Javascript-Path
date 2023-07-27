import { deleteEvent, getById, getCurrentUserGoing, goToEvent, totalGoingCount } from '../api/data.js';
import { html, nothing, until } from '../lib.js'
import { getUser } from '../utils.js';

const detailsTemplate = (eventPromise) => html`
<section id="details">
    <div id="details-wrapper">
        ${until(eventPromise, html`<p>Loading</p>`)}
    </div>
</section>`;

const eventTempalte = (event, isOwner, onDelete, totalGoing, isGoing) => html`
<img id="details-img" src=${event.imageUrl} alt="example1" />
<p id="details-title">${event.name}</p>
<p id="details-category">
    Category: <span id="categories">${event.category}</span>
</p>
<p id="details-date">
    Date:<span id="date">${event.date}</span></p>
<div id="info-wrapper">
    <div id="details-description">
    <span>${event.description}</span>
    </div>
</div>

<h3>Going: <span id="go">${totalGoing}</span> times.</h3>
<!--Edit and Delete are only for creator-->

<div id="action-buttons">
${isOwner ? html`
    <a href="/edit/${event._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}

    <!--Bonus - Only for logged-in users ( not authors )-->
    ${isOwner == false && isGoing == false
        ? html`<a href="/going/${event._id}" id="go-btn">Going</a>` : nothing}
        
</div>`


export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadEvent(ctx)))
    console.log('details')
}

async function loadEvent(ctx) {
    const eventId = ctx.params.id
    const user = getUser()

    const event = await getById(eventId)
    const totalGoing = await totalGoingCount(eventId)

    const isGoing = user ?
        await getCurrentUserGoing(eventId, user._id) : false

    const isOwner = user && user._id == event._ownerId

    console.log(totalGoing, isGoing, isOwner)

    return eventTempalte(event, isOwner, onDelete, totalGoing, isGoing)

    async function onDelete() {
        const dialog = confirm('Are you sure you want to delete this event?')
        if (dialog) {
            await deleteEvent(eventId)
            ctx.page.redirect('/catalog')
        }
    }
}

export async function onGoClick(ctx, e) {
    const eventId = ctx.params.id
    try {
        await goToEvent({ eventId })
        ctx.page.redirect(`/details/${eventId}`)

    } catch (error) {
        alert(error.message)
    }
}