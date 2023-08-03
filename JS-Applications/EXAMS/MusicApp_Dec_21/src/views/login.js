import { login } from '../api/auth.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const loginTemplate = (onSubmit) => html`
<section id="loginPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)))
    console.log('login')
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }
    try {
        await login(data.email, data.password)
        e.target.reset()
        ctx.page.redirect('/')
    } catch (error) {
        alert(error.message)
    }
}

