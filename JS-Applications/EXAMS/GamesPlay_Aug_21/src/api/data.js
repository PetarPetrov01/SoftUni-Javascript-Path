import * as api from './api.js'

const endpoints = {
    all: '/data/games?sortBy=_createdOn%20desc',
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    byId: '/data/games/',
    create: '/data/games',
    edit: '/data/games/',
    delete: '/data/games/',
}

export async function getAll() {
    return await api.get(endpoints.all)
}

export async function getRecent() {
    return await api.get(endpoints.recent)
}

export async function getById(gameId) {
    return await api.get(endpoints.byId + gameId)
}

export async function create(data) {
    await api.post(endpoints.create, data)
}

export async function edit(gameId, data) {
    await api.put(endpoints.edit + gameId, data)
}

export async function deleteById(gameId) {
    return await api.del(endpoints.delete + gameId)
}
