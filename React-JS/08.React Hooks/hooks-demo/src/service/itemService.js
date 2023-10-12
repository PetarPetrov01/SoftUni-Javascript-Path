import * as api from './api';

export const getAll = async () => {

    const result = await api.get('');
    return Object.values(result);
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