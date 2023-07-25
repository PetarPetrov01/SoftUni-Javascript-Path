import * as gameServices from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (gamesPromise) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    <!-- Display div: with information about every game (if any) -->
    ${until(gamesPromise, html`<p>Loading &hellip;</p>`)}

    <!-- Display paragraph: If there is no games  -->
    
</section>`;

const gameTempalte = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>`

const noGamesTemplate = () => html`<h3 class="no-articles">No articles yet</h3>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadGames(ctx)))
}
async function loadGames(ctx) {
    const games = await gameServices.getAll()

    return games.length > 0 ? games.map(gameTempalte) : noGamesTemplate()
}