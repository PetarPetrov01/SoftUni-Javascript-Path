import { approveMember, getTeamById, getTeamMembers, removeMember, requestMembership } from '../api/data.js'
import { html, until, nothing } from '../lib.js'

const teamHomeTemplate = (dataPromise) => html`
<section id="team-home">
    <article class="layout">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
    </article>
</section>`

const teamTemplate = (controlsTemplate, team, members, user, isOwner, ctx) => html`
<img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${members.filter(members => members.status == 'member').length} Members</span>
        <div>
            ${controlsTemplate()}
        </div>
    </div>
    <div class="pad-large">
        <h3>Members</h3>
       
        <ul class="tm-members">
        ${members
        .filter((member) => member.status == 'member')
        .map((member) => memberTemplate(ctx, member, user, isOwner, team))}
        </ul>
    </div>
    ${isOwner ? html`
    <div class="pad-large">
        <h3>Membership Requests</h3>
            <ul class="tm-members">
            ${members.filter((member) => member.status == 'pending')
            .map((member) => pendginMemberTemplate(member, ctx, member._id, team._id))}
            </ul>
    </div>`: nothing}`

const memberTemplate = (ctx, member, user, isOwner, team) => html`
    <li>${member.user.username} 
    ${isOwner && member._ownerId != user._id ?
        html`<a @click=${() => onCancel(ctx, member._id, team._id)} href="/members" class="tm-control action">Remove from team</a></li>`
        : nothing}`

const pendginMemberTemplate = (member, ctx, memberId, teamId) => html`
    <li>${member.user.username}<a @click=${() => onApprove(ctx, memberId, teamId)}href = "javascript:void(0)" class="tm-control action" > Approve</a >
    <a @click=${() => onCancel(ctx, memberId, teamId)} href = "javascript:void(0)"class="tm-control action" > Decline</a ></li > `

export function detailsPage(ctx) {
    ctx.render(teamHomeTemplate(loadTeam(ctx)))
}

async function loadTeam(ctx) {
    const id = ctx.params.id
    const user = ctx.user
    const team = await getTeamById(id)
    const members = await getTeamMembers(id)

    const currentMember = members.filter(member => member._ownerId == user._id)[0]
    console.log(members)

    const isOwner = user && user._id == team._ownerId

    let controlsTemplate;
    if (!user) {
        controlsTemplate = () => html`${nothing} `
    } else if (user && user._id == team._ownerId) {

        //Owner view
        controlsTemplate = () => html`<a href = "/edit/${id}" class="action" > Edit team</a> `
    } else if (!members.some(m => m._ownerId == user._id)) {

        //logged user, not a member
        controlsTemplate = () => html`<a @click=${() => onJoin(ctx, team._id)} href="javascript:void(0)" class="action">Join team</a> `
    } else if (members.some(m => m._ownerId == user._id && m.status == 'pending')) {

        //logged with pending request
        controlsTemplate = () => html`Membership pending. <a @click=${() => onCancel(ctx, currentMember._id, team._id)} href = "#">Cancel request</a> `
    } else if (members.some(m => m._ownerId == user._id && m.status == 'member')) {

        //member of the team
        controlsTemplate = () => html`<a @click=${() => onCancel(ctx, currentMember._id, team._id)} href = "#" class="action invert">Leave team</a> `
    }

    return teamTemplate(controlsTemplate, team, members, user, isOwner, ctx)
}

async function onJoin(ctx, teamId) {
    await requestMembership(teamId)
    ctx.page.redirect(`/details/${teamId}`)
}

async function onCancel(ctx, memberId, teamId) {
    console.log(teamId, memberId, teamId)

    await removeMember(memberId, teamId)
    ctx.page.redirect(`/details/${teamId}`)
}

async function onApprove(ctx, memberId, teamId) {

    await approveMember({
        _id: memberId,
        teamId
    })
    ctx.page.redirect(`/details/${teamId}`)
}
// <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
//                     class="tm-control action">Decline</a></li>


