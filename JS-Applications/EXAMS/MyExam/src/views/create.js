import { createFact } from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
    <h2>Add Fact</h2>
    <form @submit=${onSubmit} class="create-form">
        <input type="text" name="category" id="category" placeholder="Category" />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
        <textarea id="description" name="description" placeholder="Description" rows="10" cols="50" ></textarea>
        <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50" ></textarea>
        <button type="submit">Add Fact</button>
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

    const resultData = {
        category: data.category,
        imageUrl: data['image-url'],
        description: data.description,
        moreInfo: data['additional-info'],
    }

    try {
        await createFact(resultData)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}