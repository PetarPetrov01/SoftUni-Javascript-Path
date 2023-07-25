import * as gamesService from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const createTemplate = (onSubmit) => html`
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">
            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
    //console.log('create')
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await gamesService.create(data)
        ctx.page.redirect('/')
    } catch (error) {
        alert(error.message)
    }
}