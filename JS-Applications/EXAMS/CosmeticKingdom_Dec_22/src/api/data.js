import * as api from './api.js'

const endpoints = {
    allProducts: '/data/products?sortBy=_createdOn%20desc',
    createProduct: '/data/products',
    getById: '/data/products/',
    delete: '/data/products/',
    edit: '/data/products/',
    buyProdcut: '/data/bought',
    boughtCountById: (productId) => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    buysByUser: (productId, userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAll() {
    return await api.get(endpoints.allProducts)
}

export async function getById(id) {
    return await api.get(endpoints.getById + id)
}

export async function createProduct(data) {
    await api.post(endpoints.createProduct, data)
}

export async function deleteProduct(id) {
    await api.del(endpoints.delete + id)
}

export async function editProduct(id, data) {
    await api.put(endpoints.edit + id, data)
}


//BONUS
export async function buy(data) {
    return await api.post(endpoints.buyProdcut, data)
}

export async function getBoughtCount(productId) {
    return await api.get(endpoints.boughtCountById(productId))
}

export async function getBuysForUser(productId, userId) {
    return await api.get(endpoints.buysByUser(productId, userId))
}