import { getAll } from '../api/data.js';
import { html, until } from '../lib.js'

const catalogTemplate = (dataPromise) => html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
            ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
    </ul>

    <!-- Display an h2 if there are no posts -->
    
    </section>`;

const albumTemplate = (album) => html`
<li class="card">
    <img src=${album.imageUrl} alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
</li>`;

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadAlbums(ctx)))
    console.log('catalog')
}

async function loadAlbums(ctx) {
    const albums = await getAll()

    return albums.length > 0
        ? albums.map(albumTemplate)
        : html`<h2>There are no albums added yet.</h2>`
}