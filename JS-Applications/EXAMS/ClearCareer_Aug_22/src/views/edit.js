import * as offerService from '../api/data.js'
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';


const editTemplate = (offerPromise, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Offer</h2>
    <form @submit=${onSubmit} class="edit-form">
            ${until(offerPromise, html`<p>Loading &hellip;</p>`)}
    </form>
    </div>
</section>`;

const editFormTemplate = (offer) => html`
<input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
<input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl} />
<input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
<textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50" .value=${offer.description}></textarea>
<textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50" .value=${offer.requirements}></textarea>
<input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />
<button type="submit">post</button>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadOffer(ctx), createSubmitHandler(ctx, onSubmit)));
    console.log('edit');
}

async function loadOffer(ctx) {
    const offerId = ctx.params.id;
    const offer = await offerService.getById(offerId);

    return editFormTemplate(offer);
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!');
    }

    const offerId = ctx.params.id
    try {
        await offerService.editOffer(offerId, data);
        e.target.reset();
        ctx.page.redirect('/catalog');
    } catch (error) {
        alert(error.message);
    }
}