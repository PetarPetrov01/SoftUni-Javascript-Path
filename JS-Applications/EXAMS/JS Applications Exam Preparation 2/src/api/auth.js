import * as api from "./api.js"
import { setUser, clearUser } from "../utils.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}


//USERNAME INSTEAD OF EMAIL
export async function login(username, password) {
    try {
        const user = await api.post(endpoints.login, { username, password })
        setUser(user)
    } catch (error) {
        throw error
    }
}

export async function register(username, password) {

    try {
        const user = await api.post(endpoints.register, { username, password })
        setUser(user)
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function logout() {
    try {
        api.get(endpoints.logout)
        clearUser()
    } catch (error) {
        throw new Error(error.message)
    }
}