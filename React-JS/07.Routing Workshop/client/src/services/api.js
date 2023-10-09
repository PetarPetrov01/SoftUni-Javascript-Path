const baseUrl = 'http://localhost:3030/jsonstore/fruits/';

const request = async (method, url, data) => {
    const options = {
        method
    };

    if (data) {
        options.headers = {
            'Content-type': 'application/json'
        };
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok && response.status !== 204) {
            return;
        }

        return response.json();
    } catch (error) {
        alert(error);
    }
};
const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export { get, post, put, del };