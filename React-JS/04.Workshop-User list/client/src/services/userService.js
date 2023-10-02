const host = 'http://localhost:3005/api/';

async function api(method, url, body) {
    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${host}${url}`, options);
        const data = res.json();

        return data;
    } catch (error) {
        alert(error);
        throw (error);
    }
}

const get = api.bind(null, 'GET');
const post = api.bind(null, 'POST');
const put = api.bind(null, 'PUT');
const del = api.bind(null, 'DELETE');

async function getAll(query) {
    if (query) {
        query.criteria = query.criteria
        .split(' ')
        .map((str, i) => i === 0 ? str.toLowerCase() : str)
        .join('');
        
        return await get(`users?search=${query.search}&criteria=${query.criteria}`);
    }
    return await get('users');
}

async function getById(userId) {
    return await get(`users/${userId}`);
}

async function create(data) {
    return post('users', data);
}

async function update(userId, data) {
    return await put(`users/${userId}`, data);
}

async function deleteById(userId) {
    return await del(`users/${userId}`);
}

export { getAll, getById, create, update, deleteById };

