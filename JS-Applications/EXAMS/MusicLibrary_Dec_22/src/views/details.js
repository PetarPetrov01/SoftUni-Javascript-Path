import { deleteAlbum, getById, getLikesCount, getUserLikes, postLike } from '../api/data.js';
import { html, nothing, until } from '../lib.js'
import { getUser } from '../utils.js';

const detailsTemplate = (albumPromise) => html`
<section id="details">
    <div id="details-wrapper">
            ${until(albumPromise, html`<p>Loading</p>`)}
    </div>
</section>`;

const albumTemplate = (album, isOwner, onDelete, likesCount, hasLiked) => html`
<p id="details-title">Album Details</p>
<div id="img-wrapper">
    <img src=${album.imageUrl} alt="example1" />
</div>
<div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
        <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>
    
    <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
        ${isOwner == false && hasLiked == false
        ? html`<a href="/like/${album._id}" id="like-btn">Like</a>` : nothing}

        ${isOwner ? html`
        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
        : nothing}`


export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadAlbum(ctx)))
    console.log('details')
}

async function loadAlbum(ctx) {
    const albumId = ctx.params.id
    const user = getUser()

    const album = await getById(albumId)
    const likesCount = await getLikesCount(albumId)

    const hasLiked = user
        ? await getUserLikes(albumId, user._id) : false

    const isOwner = user && user._id == album._ownerId

    return albumTemplate(album, isOwner, onDelete, likesCount, hasLiked)

    async function onDelete() {
        const dialog = confirm(`Are you sure you want to delete "${album.album}"`)
        if (dialog) {
            await deleteAlbum(albumId)
            ctx.page.redirect('/catalog')
        }
    }
}

