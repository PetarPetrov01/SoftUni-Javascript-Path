import { createComment, getComments } from "../api/commentsService.js";
import { html } from "../lib.js";

export const commentsTemplate = (comments) => html`
${comments.length > 0
        ? html`
<h2>Comments:</h2>
    <ul>
    ${comments.map((comment) => html`
        <li class="comment">
            <p>Content: ${comment.comment}</p>
        </li>`)}
    </ul>`
        : html`<p class="no-comment">No comments.</p>`}`

export const commentFormTemplate = (ctx) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${(e) => onCommentSubmit(e, ctx)} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`

async function onCommentSubmit(e, ctx) {
    e.preventDefault()
    const gameId = ctx.params.id
    const comment = document.querySelector('[name=comment]').value.trim()
    if (comment == ''){
        return alert('Cannot submit empty comment')
    }
        try {
            await createComment({ gameId, comment })
            ctx.page.redirect(`/details/${gameId}`)
        } catch (error) {
            alert(error.message)
        }
}