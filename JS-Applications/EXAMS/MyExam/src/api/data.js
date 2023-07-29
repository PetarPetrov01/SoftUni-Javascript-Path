import * as api from './api.js'

const endpoints = {
    all: '/data/facts?sortBy=_createdOn%20desc',
    create: '/data/facts',
    byId: '/data/facts/',
    likeFact: '/data/likes',
    allLikes: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    ownLikes: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllFacts() {
    return await api.get(endpoints.all)
}

export async function getFactsById(factId) {
    return await api.get(endpoints.byId + factId)
}

export async function createFact(data) {
    await api.post(endpoints.create, data)
}

export async function editFact(factId, data) {
    await api.put(endpoints.byId + factId, data)
}

export async function deleteFact(factId) {
    await api.del(endpoints.byId + factId)
}
//BONUS

export async function likeFact(data) {
    await api.post(endpoints.likeFact, data)
}

export async function getAllLikes(factId) {
    return await api.get(endpoints.allLikes(factId))
}

export async function getOwnLikes(factId, userId) {
    return await api.get(endpoints.ownLikes(factId, userId))
}

