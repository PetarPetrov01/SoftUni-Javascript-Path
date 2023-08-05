import * as api from './api.js'

const endpoints = {
    allOffers: '/data/offers?sortBy=_createdOn%20desc',
    create: '/data/offers',
    byId: '/data/offers/',
    apply: '/data/applications',
    getApplications: (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    getApplicationForUser: (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}

export async function getAll() {
    return await api.get(endpoints.allOffers)
}

export async function getById(id) {
    return await api.get(endpoints.byId + id)
}

export async function createOffer(data) {
    return await api.post(endpoints.create, data)
}

export async function editOffer(id, data) {
    await api.put(endpoints.byId + id, data)
}

export async function deleteOffer(id) {
    await api.del(endpoints.byId + id)
}

//BONUS

export async function getAllApplications(offerId) {
    return await api.get(endpoints.getApplications(offerId))
}

export async function getUserApplication(offerId, userId) {
    return await api.get(endpoints.getApplicationForUser(offerId, userId))
}

export async function apply(data) {
    await api.post(endpoints.apply, data)
}