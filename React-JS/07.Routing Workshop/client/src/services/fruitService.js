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
