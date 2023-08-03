import * as albumService from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (albumPromise, onSubmit) => html`
<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>
${until(albumPromise,html`<p>Loading &hellip;</p>`)}
        </fieldset>
    </form>
</section>`;

const editAlbumTemplate = (album) => html`
<div class="container">
    <label for="name" class="vhide">Album name</label>
    <input id="name" name="name" class="name" type="text" .value=${album.name}>

    <label for="imgUrl" class="vhide">Image Url</label>
    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${album.imgUrl}>

    <label for="price" class="vhide">Price</label>
    <input id="price" name="price" class="price" type="text" .value=${album.price}>

    <label for="releaseDate" class="vhide">Release date</label>
    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${album.releaseDate}>

    <label for="artist" class="vhide">Artist</label>
    <input id="artist" name="artist" class="artist" type="text" .value=${album.artist}>

    <label for="genre" class="vhide">Genre</label>
    <input id="genre" name="genre" class="genre" type="text" .value=${album.genre}>

    <label for="description" class="vhide">Description</label>
    <textarea name="description" class="description" rows="10" cols="10" .value=${album.description}></textarea>

    <button class="edit-album" type="submit">Edit Album</button>
</div>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadAlbum(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadAlbum(ctx) {
    const albumId = ctx.params.id
    const album = await albumService.getById(albumId)

    return editAlbumTemplate(album)
}

async function onSubmit(ctx, data, e) {
    const albumId = ctx.params.id

    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await albumService.editAlbum(albumId, data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}

