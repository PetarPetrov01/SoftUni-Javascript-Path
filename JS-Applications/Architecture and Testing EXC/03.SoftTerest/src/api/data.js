import * as api from './api.js'

const endpoints = {
    'getIdeas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea': '/data/ideas',
    'getIdeaById': '/data/ideas/'
}

export async function getIdeas() {
    return api.get(endpoints.getIdeas)
}

export async function getIdeaById(id) {
    return api.get(endpoints.getIdeaById + id)
}

export async function createIdea(ideaObj) {
    api.post(endpoints.createIdea, ideaObj)
}

export async function deleteIdea(id) {
    api.delete(endpoints.getIdeaById + id)
}

