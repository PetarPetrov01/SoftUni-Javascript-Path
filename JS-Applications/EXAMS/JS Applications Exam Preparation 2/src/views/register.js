import { register } from "../api/auth.js"
import { html } from "../lib.js"
import { createSubmitHandler } from "../utils.js"

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="#">Sign in</a>.
            </p>
        </div>
    </div>
</section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, e) {
    try {
        if (Object.values(data).some(v => v == '')) {
            return alert('All inputs must be filled!')
        }
        if (data.password != data.repeatPass) {
            return alert('Passwords do not match!')
        }

        await register(data.username, data.password)
        e.target.reset()
        ctx.page.redirect(`/catalog`)
    } catch (error) {
        alert(error.message)
    }

}