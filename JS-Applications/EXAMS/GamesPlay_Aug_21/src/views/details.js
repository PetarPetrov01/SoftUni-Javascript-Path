import { getComments } from '../api/commentsService.js';
import * as gamesService from '../api/data.js';
import { html, nothing, until } from '../lib.js'
import { commentFormTemplate, commentsTemplate } from './comments.js';

const detailsTemplate = (gamePromise) => html`
<section id="game-details">
    
    ${until(gamePromise, html`<p>Loading &hellip;</p>`)}
    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <!--COMMENTS FORM-->
    
</section>`;

const gameTemplate = (game, isOwner, onDelete, ctx, comments) => html`
<h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">${game.summary}</p>
        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            ${commentsTemplate(comments)}
            <!-- Display paragraph: If there are no games in the database -->
        </div>
    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    ${isOwner ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${(e) => onDelete(e, game._id, ctx)} href="javascript:void(0)" class="button">Delete</a>
        </div>`: nothing}
    </div>
${ctx.user && isOwner == false ? commentFormTemplate(ctx) : nothing}`

export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadGame(ctx)))
    //console.log('details')
}

async function loadGame(ctx) {
    const gameId = ctx.params.id
    const user = ctx.user

    const [game, comments] = await Promise.all([
        gamesService.getById(gameId),
        getComments(gameId)
    ])

    const isOwner = user && user._id == game._ownerId

    return gameTemplate(game, isOwner, onDelete, ctx, comments)
}

async function onDelete(ev, gameId, ctx) {
    ev.preventDefault()
    const dialog = confirm('Are you sure you want to delete this game?')
    if (dialog) {
        await gamesService.deleteById(gameId)
        ctx.page.redirect('/')
    }
}


/*  */