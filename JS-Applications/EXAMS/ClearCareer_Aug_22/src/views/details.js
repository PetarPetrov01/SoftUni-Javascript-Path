import * as offerService from '../api/data.js'
import { html, nothing, until } from '../lib.js'
import { getUser } from '../utils.js';


const detailsTemplate = (offerPromise) => html`
<section id="details">
    <div id="details-wrapper">
        ${until(offerPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`;

const offerFormTemplate = (offer, isOwner, onDelete, applications, hasApplied) => html`
<img id="details-img" src=${offer.imageUrl} alt="example1" />
<p id="details-title">${offer.title}</p>
<p id="details-category">
    Category: <span id="categories">${offer.category}</span>
</p>
<p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
</p>
<div id="info-wrapper">
    <div id="details-description">
    <h4>Description</h4>
    <span>${offer.description}</span>
    </div>
    <div id="details-requirements">
    <h4>Requirements</h4>
    <span>${offer.requirements}</span>
    </div>
</div>
<p>Applications: <strong id="applications">${applications}</strong></p>

<!--Edit and Delete are only for creator-->
<div id="action-buttons">
    ${isOwner ? html`
    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}

    <!--Bonus - Only for logged-in users ( not authors )-->
    ${isOwner == false && hasApplied == false
        ? html`<a href="/apply/${offer._id}" id="apply-btn">Apply</a>`
        : nothing}
</div>`

export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadOffer(ctx)))
    console.log('details')
}

async function loadOffer(ctx) {

    const offerId = ctx.params.id;
    const user = getUser()

    const offer = await offerService.getById(offerId);
    const applications = await offerService.getAllApplications(offerId)
    console.log(applications)
    const hasApplied = user
        ? await offerService.getUserApplication(offer._id, user._id)
        : false

    const isOwner = user && user._id == offer._ownerId

    return offerFormTemplate(offer, isOwner, onDelete, applications, hasApplied)

    async function onDelete() {
        const dialog = confirm(`Are you sure you want to delete ${offer.title}`)
        if (dialog) {
            offerService.deleteOffer(offer._id)
            ctx.page.redirect('/catalog')
        }
    }
}

export async function onApply(ctx) {
    const offerId = ctx.params.id

    try {
        const applied = await offerService.apply({ offerId })
        console.log(applied)
        ctx.page.redirect(`/details/${offerId}`)
    } catch (error) {
        alert(error.message)
    }
}

