import { approveMember, createTeam, requestMembership } from "../api/data.js";
import { html, nothing } from "../lib.js";

const createTemplate = (onSubmit, error) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${error ? html`<div class="error">${error}</div>` : nothing}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const name = formData.get('name').trim()
        const logoUrl = formData.get('logoUrl').trim()
        const description = formData.get('description').trim()


        try {
            if (name.length < 4) {
                throw new Error('Name must be atleast 4 characters long!')
            } else if (logoUrl.length == '') {
                throw new Error('URL is required!')
            } else if (description.length < 10) {
                throw new Error('Description must be atleast 10 characters long!')
            }
            const createdTeam = await createTeam({ name, logoUrl, description })

            form.reset()
            ctx.page.redirect(`/details/${createdTeam._id}`)
        } catch (error) {
            ctx.render(createTemplate(onSubmit, error.message))
        }
    }
}