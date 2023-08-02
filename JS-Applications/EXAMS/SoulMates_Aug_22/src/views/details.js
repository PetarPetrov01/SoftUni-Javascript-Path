import { html, until, nothing } from '../lib.js'
import { deleteShoes, getById } from '../api/data.js';
import { getUser } from '../utils.js';

const detailsTemplate = (shoesPromise) => html`
<section id="details">
    <div id="details-wrapper">
        ${until(shoesPromise, html`<p>Loading</p>`)}
    </div>
</section>`;

const shoesTemplate = (shoes, isOwner, onDelete) => html`
<p id="details-title">Shoe Details</p>
<div id="img-wrapper">
    <img src=${shoes.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
    <p>
        Model: <span id="details-model">${shoes.model}</span>
    </p>
    <p>Release date: <span id="details-release">${shoes.release}</span></p>
    <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
    <p>Value: <span id="details-value">${shoes.value}</span></p>
</div>

<!--Edit and Delete are only for creator-->
${isOwner ? html`<div id="action-buttons">
    <a href="/edit/${shoes._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>`: nothing}`


export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadShoes(ctx)))
    console.log('details')
}

async function loadShoes(ctx) {
    const shoesId = ctx.params.id
    const user = getUser()
    const shoes = await getById(shoesId)

    const isOwner = user && user._id == shoes._ownerId

    return shoesTemplate(shoes, isOwner, onDelete)

    async function onDelete() {
        const dialog = confirm('Are you sure you want to delete this pair of shoes?')
        if (dialog) {
            await deleteShoes(shoesId)
            ctx.page.redirect('/catalog')
        }
    }
}