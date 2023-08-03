import { register } from '../api/auth.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)))
    console.log('register');
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    if (data.password != data['conf-pass']) {
        return alert('Passwords do not match!')
    }

    try {
        await register(data.email, data.password)
        e.target.reset()
        ctx.page.redirect('/')
    } catch (error) {
        alert(error.message)
    }
}