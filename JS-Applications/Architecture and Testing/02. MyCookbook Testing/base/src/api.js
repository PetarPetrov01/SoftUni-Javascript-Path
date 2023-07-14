async function request(method, url, body) {
    const host = 'http://localhost:3030'
    try {
        
        const token = sessionStorage.getItem('authToken')

        const options = {
            method,
            headers: {}
        }

        if (body) {
            options.headers["Content-Type"] = "application/json"
            options.body = JSON.stringify(body)
        }

        if (token) {
            options.headers["X-Authorization"] = token
        }

        const response = await fetch(host + url, options);
        if (response.status == 204) {
            return
        }

        const data = await response.json();
        if (response.status == 200) {
            return data
        } else {
            alert(data.message);
            throw new Error(data.message);
        }
    } catch (err) {
        alert(err.message)
        throw err
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')