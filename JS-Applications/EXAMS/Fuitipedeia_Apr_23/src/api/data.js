import * as api from './api.js'

const endpoints = {
    getAll: '/data/fruits?sortBy=_createdOn%20desc',
    createFruit: '/data/fruits',
    byId: '/data/fruits/',
    bySearch: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`
}

export async function getAll() {
    return await api.get(endpoints.getAll)
}

export async function getFruitById(fruitId) {
    return await api.get(endpoints.byId + fruitId)
}

export async function createFruit(data) {
    await api.post(endpoints.createFruit, data)
}

export async function deleteFruit(fruitId) {
    await api.del(endpoints.byId + fruitId)
}

export async function editFruit(fruitId, data) {
    await api.put(endpoints.byId + fruitId, data)
}

//BONUS
export async function getBySearch(search) {
    return await api.get(endpoints.bySearch(search))
}

