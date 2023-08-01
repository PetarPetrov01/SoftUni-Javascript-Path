import { getUser, clearUser } from "../utils.js"

async function request(method, url, body) {

    const host = 'http://localhost:3030'

    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }

    const user = getUser()
    if (user) {
        options.headers['X-Authorization'] = user.accessToken
    }


    try {
        const response = await fetch(host + url, options)

        if (response.ok != true) {
            if (response.status == 403) {
                clearUser()
            }
            const err = await response.json()
            throw new Error(err.message)
        }

        if (response.status == 204) {
            return response
        } else {
            return response.json()
        }


    } catch (error) {
        alert(error.message)
        throw (error.message)
    }
}

const get = await request.bind(null, 'get')
const post = await request.bind(null, 'post')
const put = await request.bind(null, 'put')
const del = await request.bind(null, 'delete')

export { get, post, put, del }




