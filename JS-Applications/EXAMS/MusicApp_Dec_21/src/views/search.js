import * as albumService from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const searchTemplate = (albumPromise, onSubmit, ctx) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${(e) => onSubmit(e, ctx)} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        <!--If have matches-->
        ${until(albumPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`

const albumTemplate = (album, user) => html`
${console.log(user)}
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${user ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>` : nothing}
    </div>
</div>`

export function seachPage(ctx) {
    ctx.render(searchTemplate(loadAlbum(ctx), onSubmit, ctx))
}

async function loadAlbum(ctx) {
    debugger
    const search = ctx.search || ''

    let albums = search != ''
        ? await albumService.searchAlbum(search)
        : await albumService.getAll()

    return albums.length > 0
        ? albums.map((album) => albumTemplate(album, ctx.user))
        : html`<p class="no-result">No result.</p>`
}

async function onSubmit(e, ctx) {
    e.preventDefault()

    const search = document.querySelector('[name="search"]').value
    if (search == '') {
        return alert(`Field is empty!`)
    }

    ctx.page.redirect(`/search?search=${search}`)
}