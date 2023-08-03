import * as api from './api.js'

const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    byId: '/data/albums/',
    deleteAlbum: '/data/albums/',
    editAlbum: '/data/albums/',
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
}

export async function getAll() {
    return await api.get(endpoints.all)
}

export async function getById(albumId) {
    return await api.get(endpoints.byId + albumId)
}

export async function createAlbum(data) {
    await api.post(endpoints.create, data)
}

export async function deleteAlbum(id) {
    await api.del(endpoints.deleteAlbum + id)
}

export async function editAlbum(id, data) {
    await api.put(endpoints.editAlbum + id, data)
}

export async function searchAlbum(query) {
    return await api.get(endpoints.search(query))
}





