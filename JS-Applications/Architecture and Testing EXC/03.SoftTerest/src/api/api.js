async function request(method, url, body) {
    const host = 'http://localhost:3030';
    const options = {
        method,
        headers: {}
    };

    if (body != undefined) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json";
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    };

    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            if (response.status == 403) {
                localStorage.removeItem('user')
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response
        } else {
            return response.json()
        }

    } catch (error) {
        alert(error.message);
        throw (error);
    }
}

const get = await request.bind(null, 'GET')
const post = await request.bind(null, 'POST')
const put = await request.bind(null, 'PUT')
const del = await request.bind(null, 'delete')

export {
    get,
    post,
    put,
    del as delete
}