import * as api from './api';

const baseUrl = 'http://localhost:3030/data/fruits/';

export const getAll = async (search = '') => {
    const result = await api.get(baseUrl);
};
