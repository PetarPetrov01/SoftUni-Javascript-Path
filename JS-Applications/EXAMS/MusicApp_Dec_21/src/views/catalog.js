import * as albumService from '../api/data.js';
import { html, nothing, until } from '../lib.js'

const catalogTemplate = (albumsPromise) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${until(albumsPromise, html`<p>Loading &hellip;</p>`)}
    <!--No albums in catalog-->
</section>`;

const albumTemplate = (album, user) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre:  ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${user ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>` : nothing}
        
    </div>
</div>`;

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadAlbums(ctx)))
    console.log('catalog')
}

async function loadAlbums(ctx) {
    debugger
    const albums = await albumService.getAll()
    const user = ctx.user
    console.log(user)

    return albums.length > 0 ? albums.map((album) => albumTemplate(album, user)) : html`<p>No Albums in Catalog!</p>`
}