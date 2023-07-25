import * as api from './api.js'

const endpoints = {
    get: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    create: '/data/comments'
}

export async function getComments(gameId) {
    return await api.get(endpoints.get(gameId))
}

export async function createComment(data) {
    return await api.post(endpoints.create, data)
}