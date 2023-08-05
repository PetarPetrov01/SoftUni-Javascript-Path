import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';
import * as offerService from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
    <h2>Create Offer</h2>
    <form @submit=${onSubmit} class="create-form">
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
        <input type="text" name="category" id="job-category" placeholder="Category" />
        <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50" ></textarea>
        <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50" ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />
        <button type="submit">post</button>
    </form>
    </div>
</section>`;

export function createPage(ctx) {

    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
    console.log('create');
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!');
    }

    try {
        await offerService.createOffer(data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}
