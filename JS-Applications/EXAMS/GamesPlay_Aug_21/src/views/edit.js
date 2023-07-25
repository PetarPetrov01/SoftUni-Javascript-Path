import * as gamesService from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (gamePromise, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        ${until(gamePromise, html`<p>Loading &hellip;</p>`)}
    </form>
</section>`;

const gameTemplate = (game) => html`
<div class="container">
    <h1>Edit Game</h1>
    <label for="leg-title">Legendary title:</label>
    <input type="text" id="title" name="title" .value=${game.title}>

    <label for="category">Category:</label>
    <input type="text" id="category" name="category" .value=${game.category}>

    <label for="levels">MaxLevel:</label>
    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

    <label for="game-img">Image:</label>
    <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

    <label for="summary">Summary:</label>
    <textarea name="summary" id="summary" .value=${game.summary}></textarea>
    <input class="btn submit" type="submit" value="Edit Game">
</div>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadGame(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadGame(ctx) {
    const gameId = ctx.params.id
    const game = await gamesService.getById(gameId)

    return gameTemplate(game)
}

async function onSubmit(ctx, data, e) {
    const gameId = ctx.params.id
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await gamesService.edit(gameId, data)
        e.target.reset()
        ctx.page.redirect(`/details/${gameId}`)
    } catch (error) {
        alert(error.message)
    }
}
