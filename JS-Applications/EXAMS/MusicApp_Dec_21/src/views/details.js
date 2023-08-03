import * as albumService from '../api/data.js';
import { html, nothing, until } from '../lib.js'

const detailsTemplate = (albumPromise) => html`
<section id="detailsPage">
    <div class="wrapper">
        ${until(albumPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`;

const albumTemplate = (album, isOwner, onDelete, ctx) => html`
<div class="albumCover">
    <img src=${album.imgUrl}>
</div>
<div class="albumInfo">
    <div class="albumText">
        <h1>Name: ${album.name}</h1>
        <h3>Artist: ${album.artist}</h3>
        <h4>Genre: ${album.genre}</h4>
        <h4>Price: $${album.price}</h4>
        <h4>Date: ${album.releaseDate}</h4>
        <p>Description: ${album.description}</p>
    </div>

    <!-- Only for registered user and creator of the album-->
    ${isOwner ? html`<div class="actionBtn">
        <a href="/edit/${album._id}" class="edit">Edit</a>
        <a @click=${(e) => onDelete(e, ctx)} href="javascript:void(0)" class="remove">Delete</a>
    </div>` : nothing}
    
</div>`

export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadAlbum(ctx)))
    console.log('details')
}

async function loadAlbum(ctx) {
    const albumId = ctx.params.id
    const user = ctx.user

    const album = await albumService.getById(albumId)
    const isOwner = user && user._id == album._ownerId

    return albumTemplate(album, isOwner, onDelete, ctx)
}

async function onDelete(e, ctx) {
    e.preventDefault()

    const albumId = ctx.params.id
    const confirmation = confirm('Are you sure you want to delete this album?')
    if (confirmation) {
        albumService.deleteAlbum(albumId)

        ctx.page.redirect('/catalog')
    }
}
