async function request(method, body) {
    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.body = JSON.stringify(body)
        options.headers['Content-Type'] = 'application/json'
    }

    try {
        const response = await fetch("http://localhost:3030/jsonstore/advanced/dropdown", options)
        if (response.ok == false) {
            const err = await response.json()
            throw new Error(err.message)
        }

        const data = await response.json()
        return data
    } catch (error) {
        alert(error.message)
    }
}

export const getTowns = await request.bind(null, 'GET')
export const postTown = await request.bind(null, 'POST')