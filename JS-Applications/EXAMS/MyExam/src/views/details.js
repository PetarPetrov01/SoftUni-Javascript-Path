import { deleteFact, getAllLikes, getFactsById, getOwnLikes, likeFact } from '../api/data.js';
import { html, nothing, until } from '../lib.js'
import { getUser } from '../utils.js';

const detailsTemplate = (factPromise) => html`
<section id="details">
    <div id="details-wrapper">
        ${until(factPromise, html`<p>Loading</p>`)}
    </div>
</section>`;

const factTemplate = (fact, isOwner, onDelete, likesCount, hasLiked) => html`
<img id="details-img" src=${fact.imageUrl} alt="example1" />
<p id="details-category">${fact.category}</p>
<div id="info-wrapper">
    <div id="details-description">
        <p id="description">${fact.description}</p>
        <p id ="more-info">${fact.moreInfo}</p>
    </div>

    <h3>Likes:<span id="likes">${likesCount}</span></h3>

        <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
        ${isOwner ? html`<a href="/edit/${fact._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}
        
        ${isOwner == false && hasLiked == false
        ? html`<a href="/like/${fact._id}" id="like-btn">Like</a>`
        : nothing}
    </div >
</div >`

export async function detailsPage(ctx) {
        ctx.render(detailsTemplate(loadFact(ctx)))
        console.log('details')
    }

async function loadFact(ctx) {
    const factId = ctx.params.id
    const user = getUser()
    const fact = await getFactsById(factId)

    const likesCount = await getAllLikes(factId)
    const hasLiked = user
        ? await getOwnLikes(factId, user._id)
        : false

    const isOwner = user && user._id == fact._ownerId

    return factTemplate(fact, isOwner, onDelete, likesCount, hasLiked)

    async function onDelete() {
        const dialog = confirm('Are you sure you want to delete this fact?')
        if (dialog) {
            await deleteFact(factId)
            ctx.page.redirect('/catalog')
        }
    }
}

export async function onLike(ctx) {
    const factId = ctx.params.id

    try {
        const liked = await likeFact({ factId })
        console.log(liked)
        ctx.page.redirect(`/details/${ factId }`)
    } catch (error) {
        alert(error.message)
    }
}