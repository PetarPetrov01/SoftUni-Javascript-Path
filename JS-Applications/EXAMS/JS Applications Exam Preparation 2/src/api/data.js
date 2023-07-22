import { editPage } from '../views/edit.js'
import * as api from './api.js'

const endpoints = {
    allCars: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    byId: '/data/cars/',
    delete: '/data/cars/',
    edit: '/data/cars/',
    getOwn: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getBySearch: (query) => `/data/cars?where=year%3D${query}`
}

export async function getAll() {
    return await api.get(endpoints.allCars)
}

export async function create(data) {
    return await api.post(endpoints.create, data)
}

export async function getById(id) {
    return await api.get(endpoints.byId + id)
}

export async function deleteCar(id) {
    await api.del(endpoints.delete + id)
}

export async function editCar(id, body) {
    return await api.put(endpoints.edit + id, body)
}

export async function getOwn(userId) {
    return await api.get(endpoints.getOwn(userId))
}

export async function getBySearch(search) {
    debugger
    return await api.get(endpoints.getBySearch(search))
}
