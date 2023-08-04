import { editAlbum, getById } from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (albumPromise, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${onSubmit} class="edit-form">
        
    ${until(albumPromise, html`<p>Loading</p>`)}
        <button type="submit">post</button>
        </form>
    </div>
</section>`;

const editFormTemplate = (album) => html`
<input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer} />
<input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album} />
<input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl} />
<input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release} />
<input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label} />
<input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales} /> `

export function editPage(ctx) {
    ctx.render(editTemplate(loadAlbum(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadAlbum(ctx) {
    const albumId = ctx.params.id
    const album = await getById(albumId)

    return editFormTemplate(album)
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    const albumId = ctx.params.id
    try {
        await editAlbum(albumId, data)
        e.target.reset()
        ctx.page.redirect(`/details/${albumId}`)
    } catch (error) {
        alert(error.message)
    }
}
