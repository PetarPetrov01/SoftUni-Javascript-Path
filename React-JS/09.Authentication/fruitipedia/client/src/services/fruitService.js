import * as api from './api';

const baseUrl = 'http://localhost:3030/data/fruits/';

export const getAll = async (search = '') => {
    const result = await api.get(baseUrl);
    return search
        ? Object.values(result)
            .filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
        : Object.values(result);
    //jsonstore does not work with query params!!!
};

export const create = async (data) => {
    return await api.post(baseUrl, data);
};

export const getById = async (id) => {
    const result = await api.get(`${baseUrl}${id}`);
    return result;
};

export const edit = async (id, body) => {
    const result = await api.put(`${baseUrl}${id}`, body);
    return result;
};

export const deleteById = async (id) => {
    await api.del(`${baseUrl}${id}`);
};