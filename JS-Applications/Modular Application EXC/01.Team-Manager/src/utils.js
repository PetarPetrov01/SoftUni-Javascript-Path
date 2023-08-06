export function getUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
}

export function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function clearUser() {
    localStorage.removeItem('user')
}


