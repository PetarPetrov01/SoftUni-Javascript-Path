import { editFruit, getFruitById } from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (fruitPromise, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fruit</h2>
        <form @submit=${onSubmit} class="edit-form">
            ${until(fruitPromise, html`<p>Loading</p>`)}
        </form>
    </div>
</section>`;

const editFormTemplate = (fruit) => html`
<input type="text" name="name" id="name" placeholder="Fruit Name" .value=${fruit.name} />
<input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL" .value=${fruit.imageUrl} />
<textarea id="fruit-description" name="description" placeholder="Description" rows="10" cols="50" .value=${fruit.description}></textarea>
<textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50" .value=${fruit.nutrition}></textarea>
<button type="submit">post</button>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadFruit(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadFruit(ctx) {
    const fruitId = ctx.params.id
    const fruit = await getFruitById(fruitId)

    return editFormTemplate(fruit)
}

async function onSubmit(ctx, data, e) {
    const fruitId = ctx.params.id

    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await editFruit(fruitId, data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}