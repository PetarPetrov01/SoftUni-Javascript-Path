import { get, post, put, del } from './api.js'


const endpoints = {
    getAll: '/data/catalog',
    getById: '/data/catalog/',
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/',
    getOwn: '/data/catalog'
}

export async function getAll() {
    return await get(endpoints.getAll)
}

export async function getById(id) {
    return await get(endpoints.getById + id)
}

export async function createItem(body) {
    await post(endpoints.create, body)
}

export async function editItem(id, body) {
    await put(endpoints.edit + id, body)
}

export async function deleteItem(id) {
    await del(endpoints.delete + id)
}

export async function getOwnItems(userId) {
    return await get(endpoints.getOwn + `?where=_ownerId%3D%22${userId}%22`)
}
