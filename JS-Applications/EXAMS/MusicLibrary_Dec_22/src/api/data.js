import * as api from './api.js'

const endpoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc',
    create: '/data/albums',
    byId: '/data/albums/',
    edit: '/data/albums/',
    postLike: '/data/likes',
    getAllLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    getUserLikes: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export async function getAll() {
    return await api.get(endpoints.getAll)
}

export async function getById(id) {
    return await api.get(endpoints.byId + id)
}

export async function createAlbum(data) {
    await api.post(endpoints.create, data)
}

export async function editAlbum(albumId, data) {
    await api.put(endpoints.edit + albumId, data)
}

export async function deleteAlbum(albumId) {
    await api.del(endpoints.byId + albumId)
}
//BONUS
export async function getLikesCount(albumId) {
    return await api.get(endpoints.getAllLikes(albumId))
}

export async function getUserLikes(albumId, userId) {
    return await api.get(endpoints.getUserLikes(albumId, userId))
}

export async function postLike(data) {
    await api.post(endpoints.postLike, data)
}
