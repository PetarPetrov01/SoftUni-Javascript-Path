import * as api from './api';
import { setUserStorage } from './userStorage';

const baseUrl = 'http://localhost:3030/users';

export const login = async (data) => {

    try {
        const result = await api.post(`${baseUrl}/login`, data);
        return result;

    } catch (error) {
        alert(error);
    }
};

export const register = async (data) => {
    try {
        const result = await api.post(`${baseUrl}/register`, data);
        setUserStorage(result);

        return result;
    } catch (error) {
        alert(error);
    }
};

export const logout = async () => {
    try {
        await api.get(`${baseUrl}/logout`);
    } catch (error) {
        alert(error);
    }
};