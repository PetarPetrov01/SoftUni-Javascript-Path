import { editFact, getFactsById } from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (factPromise, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Fact</h2>
    <form @submit=${onSubmit} class="edit-form">
            ${until(factPromise, html`<p>Loading</p>`)}
    </form>
    </div>
</section>`;

const editFormTemplate = (fact) => html`
<input type="text" name="category" id="category" placeholder="Category" .value=${fact.category} />
<input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${fact.imageUrl} />
<textarea id="description" name="description" placeholder="Description" rows="10" cols="50" .value=${fact.description} ></textarea>
<textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50" .value=${fact.moreInfo} ></textarea>
<button type="submit">Post</button>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadFact(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadFact(ctx) {
    const factId = ctx.params.id
    const fact = await getFactsById(factId)

    return editFormTemplate(fact)
}

async function onSubmit(ctx, data, e) {
    const factId = ctx.params.id
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    const resultData = {
        category: data.category,
        imageUrl: data['image-url'],
        description: data.description,
        moreInfo: data['additional-info'],
    }

    try {
        await editFact(factId, resultData)
        e.target.reset()
        ctx.page.redirect(`/details/${factId}`)
    } catch (error) {
        alert(error.message)
    }
}