import { showHome } from "./home.js"
import { loadPage, updateNavigation } from "./utils.js"

const registerSection = document.querySelector('#form-sign-up')
const form = document.querySelector('#register-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    onSubmit()
})

async function onSubmit() {
    const formData = new FormData(form)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const rePass = formData.get('repeatPassword').trim()

    if (email == "") {
        return alert('Email must be filled!')
    } else if (password.length < 6) {
        return alert('Password must be atleast 6 characters long!')
    } else if (password != rePass) {
        return alert('Passwords do not match!')
    }
    
    await register(email, password, rePass)

    form.reset()
    updateNavigation()
    showHome()
}

async function register(email, password, rePass) {
    try {
        const res = await fetch('http://localhost:3030/users/register', {
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
        localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        alert(error.message)
    }
}

export function showRegister() {
    loadPage(registerSection)
}