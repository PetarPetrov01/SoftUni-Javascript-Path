import { editTeam, getTeamById } from "../api/data.js";
import { html, nothing, until } from "../lib.js";

const editTemplate = (dataPromise, onSubmit) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
            ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
        </form>
    </article>
</section>`

const teamTemplate = (team, error) => html`
${error ? html`<div class="error">${error}</div>` : nothing}
<label>Team name: <input type="text" name="name" .value=${team.name}></label>
<label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
<label>Description: <textarea name="description" .value=${team.description}></textarea></label >
    <input class="action cta" type="submit" value="Save Changes">`

export function editPage(ctx) {
    ctx.render(editTemplate(loadTeam(ctx.params.id), onSubmit))

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
            
            const updateTeam = await editTeam(ctx.params.id, { name, logoUrl, description })

            form.reset()
            ctx.page.redirect(`/details/${updateTeam._id}`)
        } catch (error) {
            ctx.render(editTemplate(loadTeam(ctx.params.id, error.message), onSubmit))
        }
    }
}

async function loadTeam(id, error) {
    const team = await getTeamById(id)

    return teamTemplate(team, error)
}