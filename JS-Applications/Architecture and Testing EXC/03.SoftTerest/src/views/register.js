import { register } from "../api/auth.js";
const section = document.querySelector('#registerPage');
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

export function showRegister(context) {
    context.showSection(section)
}

let ctx;

async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(form)

    const email = formData.get('email')
    const password = formData.get('password')
    const rePass = formData.get('repeatPassword')

    if (password != rePass) {
        return alert('Passwords must match!')
    }

    await register(email, password)
    form.reset()
    ctx.updateNav()
    ctx.goTo('/')
}