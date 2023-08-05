import { get, post } from "./api.js"
import { setUser, clearUser } from "../utils.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export async function login(email, password) {
    try {
        const user = await post(endpoints.login, { email, password })
        setUser(user)
    } catch (error) {
        alert(error.message)
        throw error.message
    }
}

export async function register(email, password) {

    try {
        const user = await post(endpoints.register, { email, password })
        setUser(user)
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function logout() {
    try {
        get(endpoints.logout)
        clearUser()
    } catch (error) {
        throw new Error(error.message)
    }
}