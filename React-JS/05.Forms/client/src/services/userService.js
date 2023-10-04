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

async function getAll(query, sorting) {
    let path = 'users';

    if (query) {
        query.criteria = (query.criteria[0].toLowerCase() + query.criteria.substring(1))
            .split(' ')
            .join('');

        path += `?search=${query.search}&criteria=${query.criteria}`;
    }

    if (sorting) {
        path += `${query ? '&' : '?'}sort=${sorting.sort}&order=${sorting.order}`;
    }
    console.log(path);
    return await get(path);
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

