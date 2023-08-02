import * as api from './api.js'

const endpoints = {
    all: '/data/shoes?sortBy=_createdOn%20desc',
    create: '/data/shoes',
    byId: '/data/shoes/',
    bySearch: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
}

export async function getAllShoes() {
    return await api.get(endpoints.all)
}

export async function getById(id) {
    return await api.get(endpoints.byId + id)
}

export async function createShoes(data) {
    await api.post(endpoints.create, data, true)
}

export async function deleteShoes(id) {
    await api.del(endpoints.byId + id)
}

export async function editShoes(id, data) {
    await api.put(endpoints.byId + id, data)
}
//BONUS
export async function getBySearch(search) {
    return await api.get(endpoints.bySearch(search))
}
