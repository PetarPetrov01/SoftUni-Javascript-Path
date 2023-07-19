import { showHome } from "./home.js"
import { loadPage, updateNavigation } from "./utils.js"

const loginSection = document.querySelector('#form-login')
const form = document.querySelector('#login-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    onsubmit()
})

async function onsubmit() {
    const formData = new FormData(form)

    const email = formData.get('email')
    const password = formData.get('password')
    await login(email, password)

    form.reset()
    updateNavigation()
    showHome()
}

async function login(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        if (res.ok == false) {
            const err = await res.json()
            throw new Error(err.message)
        }

        const data = await res.json()
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        alert(error.message)
    }
}

export function showLogin() {
    loadPage(loginSection)
}