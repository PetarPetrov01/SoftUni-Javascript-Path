import { createFruit } from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Fruit</h2>
        <form @submit=${onSubmit} class="create-form">
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
        <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image" />
        <textarea id="fruit-description" name="description" placeholder="Description" rows="10"
            cols="50"></textarea>
        <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
        <button type="submit">Add Fruit</button>
        </form>
    </div>
</section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
    console.log('create')
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await createFruit(data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}