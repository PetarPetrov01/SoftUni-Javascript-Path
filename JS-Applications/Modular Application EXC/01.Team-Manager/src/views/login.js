import { login } from "../api/auth.js";
import { html, nothing } from "../lib.js";

const loginTemplate = (onLogin, error) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onLogin} id="login-form" class="main-form pad-large">
            ${error ? html`<div class="error">${error}</div>` : nothing}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`

export function loginPage(ctx) {

    ctx.render(loginTemplate(onLogin, ''))

    async function onLogin(e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const email = formData.get('email')
        const password = formData.get('password')
        try {
            if (email == '' || password == '') {
                throw new Error('All inputs must be filled!')
            }

            await login(email, password)

            form.reset()
            ctx.page.redirect('/my-teams')
        } catch (error) {
            console.log(error.message)
            ctx.render(loginTemplate(onLogin, error.message))
        }

    }
}