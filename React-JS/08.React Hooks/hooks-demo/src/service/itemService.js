import * as api from './api';

export const getAll = async () => {
    //TODO REMOVE TIMER

    return new Promise((resolve) => {
        setTimeout(async () => {
            // TODO: Remove the timer before making the actual API call
            const result = await api.get('');
            resolve(Object.values(result));
        }, 2000);
    });

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