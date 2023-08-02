import { editShoes, getById } from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (shoesPromise, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onSubmit} class="edit-form">
            ${until(shoesPromise, html`<p>Loading</p>`)}
        </form>
    </div>
</section>`;

const editFormTemplate = (shoes) => html`
    <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${shoes.brand} />
    <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${shoes.model} />
    <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${shoes.imageUrl} />
    <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${shoes.release} />
    <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${shoes.designer} />
    <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${shoes.value} />

    <button type="submit">post</button>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadShoes(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadShoes(ctx) {
    const shoesId = ctx.params.id
    const shoes = await getById(shoesId)

    return editFormTemplate(shoes)
}

async function onSubmit(ctx, data, e) {
    const shoesId = ctx.params.id
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await editShoes(shoesId, data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}

