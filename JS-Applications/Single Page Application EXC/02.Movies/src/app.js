import { showCreate } from "./create.js"
import { showHome } from "./home.js"
import { showLogin } from "./login.js"
import { showRegister } from "./register.js"
import { updateNavigation } from "./utils.js"

const nav = document.querySelector('nav')
nav.addEventListener('click', navigate)

document.querySelector('a#createLink').addEventListener('click', navigate)

const views = {
    'homeLink': showHome,
    'logoutBtn': onLogout,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate,
}

function navigate (e){
    e.preventDefault()
    if (e.target.tagName == 'A') {
        const func = views[e.target.id]
        func()
    }
}


async function onLogout() {
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)
    try {
        await fetch('http://localhost:3030/users/logout', {
            headers: {
                "X-Authorization": user.accessToken
            }
        })
        localStorage.removeItem('user')
        updateNavigation()
        showLogin()
    } catch (error) {
        alert(error.message)
    }
}

showHome()
updateNavigation()