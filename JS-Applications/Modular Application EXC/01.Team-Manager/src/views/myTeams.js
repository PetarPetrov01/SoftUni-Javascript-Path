import { getAllMembers, getTeamsForUser } from '../api/data.js'
import { html, until } from '../lib.js'

const myTeamsTemplate = (teamTemplate) => html`
<section id="my-teams">
    <article class="pad-med">
        <h1>My Teams</h1>
    </article>
${until(teamTemplate, html`<p>Loading &hellip;</p>`)}
</section>`

const notMemberTemplate = () => html`
<article class="layout narrow">
    <div class="pad-med">
        <p>You are not a member of any team yet.</p>
        <p><a href="/catalog">Browse all teams</a> to join one, or use the button bellow to cerate your own
            team.</p>
    </div>
    <div class=""><a href="/create" class="action cta">Create Team</a></div>
</article>`

const teamTemplate = (team, members) => html`
<article class="layout">
<img src=${team.team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.team.name}</h2>
        <p>${team.team.description}</p>
        <span class="details">${members} Members</span>
        <div><a href="/details/${team.team._id}" class="action">See details</a></div>
    </div>
</article>`

export function myTeamsPage(ctx) {
    ctx.render(myTeamsTemplate(loadTeam(ctx)))
}

async function loadTeam(ctx) {
    const id = ctx.user._id
    const teams = await getTeamsForUser(id)
    const allMembers = await getAllMembers()

    if (teams.length < 0) {
        return notMemberTemplate
    } else {
        return teams.map((team) => {
            console.log(team)
            let members = allMembers
                .filter(m => m.teamId == team.team._id)
                .length
            return teamTemplate(team, members)
        })
    }
}