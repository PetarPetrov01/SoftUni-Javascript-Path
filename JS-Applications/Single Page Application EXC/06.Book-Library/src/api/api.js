async function request(method, url, body) {
    const options = {
        method,
        headers: {}
    }

    if (body != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(url, options)

        if (response.ok != true) {
            const err = await response.json()
            throw new Error(err.message)
        }

        if (response.status == 204) {
            return
        }

        const data = await response.json()
        return data

    } catch (error) {
        alert(error.message)
    }
}

const get = request.bind(null, 'GET')
const post = request.bind(null, 'POST')
const put = request.bind(null, 'PUT')
const del = request.bind(null, 'DELETE')

export { get, post, put, del }