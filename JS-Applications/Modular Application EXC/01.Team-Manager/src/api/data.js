import { get, post, put, del } from './api.js'


const endpoints = {
    getAllTeams: '/data/teams',
    getAllMembers: '/data/members?where=status%3D%22member%22',
    getTeamById: '/data/teams/',
    allMembersInTeam: (teamId) => `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
    createTeam: '/data/teams',
    editTeam: '/data/teams/',
    requestMembership: '/data/members',
    membershipApproval: '/data/members/',
    delete: '/data/members/',
    getOwn: '/data/teams',
    teamsForCurrentUser: (userId) =>
        `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
}

export async function getAllTeams() {
    return await get(endpoints.getAllTeams)
}

export async function getTeamById(id) {
    return await get(endpoints.getTeamById + id)
}

export async function createTeam(body) {
    const result = await post(endpoints.createTeam, body)
    const request = await requestMembership(result._id)
    await approveMember(request)

    return result
}

export async function editTeam(id, body) {
    return await put(endpoints.editTeam + id, body)
}

export async function deleteTeam(id) {
    await del(endpoints.delete + id)
}

export async function getOwnTeams(userId) {
    return await get(endpoints.getOwn + `?where=_ownerId%3D%22${userId}%22`)
}

//Members
export async function getAllMembers() {
    return await get(endpoints.getAllMembers)
}

export async function getTeamMembers(teamId) {
    return await get(endpoints.allMembersInTeam(teamId))
}

export async function getTeamsForUser(userId) {
    return await get(endpoints.teamsForCurrentUser(userId))
}

export async function requestMembership(teamId) {
    const body = { teamId }
    return await post(endpoints.requestMembership, body)
}

export async function approveMember(data) {
    const memberId = data._id
    const body = {
        teamId: data.teamId,
        status: 'member'
    }

    return await put(endpoints.membershipApproval + memberId, body)
}

export async function removeMember(memberId, teamId) {

    await del(endpoints.delete + memberId, { teamId })
}


