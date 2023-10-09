import * as api from './api';

export const getAll = async (search = '') => {

    const result = await api.get('');
    console.log(result);
    return search
        ? Object.values(result)
            .filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
        : Object.values(result);
    //jsonstore does not work with query params!!!
};

export const create = async (data) => {
    return await api.post('', data);
};

export const getById = async (id) => {
    const result = await api.get(id);
    return result;
};

export const edit = async (id, body) => {
    const result = await api.put(id, body);
    return result;
};

export const deleteById = async (id) => {
    await api.del(id);
};