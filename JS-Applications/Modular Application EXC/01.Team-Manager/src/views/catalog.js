import { getAllMembers, getAllTeams } from "../api/data.js";
import { nothing, until } from "../lib.js";
import { html } from "../lib.js";


const catalogTemplate = (teamPromise, user) => html` 
<section id="browse">
    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
${user ? html`
<article class="layout narrow">
    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>` : nothing}
    ${until(teamPromise, html`<p>Loading &hellip;</p>`)}
</section>`

const teamTemplate = (team, members) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${members} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`

export function catalogPage(ctx) {
    const user = ctx.user

    ctx.render(catalogTemplate(loadTeams(), user))
}

async function loadTeams() {
    const teams = await getAllTeams()
    const allMembers = await getAllMembers()

    console.log(allMembers)
    return teams.map((team) => {
        let members = allMembers
            .filter(m => m.teamId == team._id)
            .length
        return teamTemplate(team, members)
    })
}