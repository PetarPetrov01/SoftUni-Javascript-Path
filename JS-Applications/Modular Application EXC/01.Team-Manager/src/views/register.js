import { html, nothing } from "../lib.js";
import { register } from "../api/auth.js";

const registerTemplate = (onSubmit, error) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
        ${error ? html`<div class="error">${error}</div>` : nothing}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit, ''))

    async function onSubmit(e) {
        e.preventDefault()

        const form = e.target

        const formData = new FormData(form)

        const email = formData.get('email')
        const username = formData.get('username')
        const password = formData.get('password')
        const repass = formData.get('repass')
        try {
            if (email.match(/\w+@\w+\.\w+/) == null) {
                throw new Error('Invalid email!')
            } else if (username.length < 3) {
                throw new Error('Username must be atleast 3 characters long!')
            } else if (password.length < 3) {
                throw new Error('Password must be atleast 3 characters long!')
            } else if (password != repass) {
                throw new Error('Passwords do not match!')
            }

            await register(email, password, username)

            form.reset()
            ctx.page.redirect('/my-teams')
        } catch (error) {
            ctx.render(registerTemplate(onSubmit, error.message))
        }
    }
}