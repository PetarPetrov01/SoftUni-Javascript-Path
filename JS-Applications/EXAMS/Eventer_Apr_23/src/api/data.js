import * as api from './api.js'

const endpoints = {
    getAll: '/data/events?sortBy=_createdOn%20desc',
    create: '/data/events',
    byId: '/data/events/',
    goingTo: '/data/going',
    totalGoing: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    currentUserGoing: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllEvents() {
    return await api.get(endpoints.getAll)
}

export async function getById(id) {
    return await api.get(endpoints.byId + id)
}

export async function createEvent(data) {
    await api.post(endpoints.create, data)
}

export async function deleteEvent(id) {
    await api.del(endpoints.byId + id)
}

export async function editEvent(id, data) {
    await api.put(endpoints.byId + id, data)
}

//BONUS
export async function goToEvent(data) {
    await api.post(endpoints.goingTo, data)
}

export async function totalGoingCount(eventId) {
    return await api.get(endpoints.totalGoing(eventId))
}

export async function getCurrentUserGoing(eventId, userId) {
    return await api.get(endpoints.currentUserGoing(eventId, userId))
}