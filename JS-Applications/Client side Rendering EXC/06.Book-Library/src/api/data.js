import { get, post, put, del } from './api.js'
import { render, html } from '../../node_modules/lit-html/lit-html.js'


export { render, html }

const host = 'http://localhost:3030/'

const endpoints = {
    getBooks: 'jsonstore/collections/books',
    getBookById: 'jsonstore/collections/books/'
}

export async function getAllBooks() {
    return await get(host + endpoints.getBooks)
}

export async function getBookById(id) {
    return await get(host + endpoints.getBookById + id)
}

export async function createBook(data) {
    await post(host + endpoints.getBooks, data)
}

export async function updateBook(id, data) {
    await put(host + endpoints.getBookById + id, data)
}

export async function deleteBook(id) {
    await del(host + endpoints.getBookById + id)
}