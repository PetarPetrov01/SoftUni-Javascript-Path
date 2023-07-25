import * as userService from '../api/auth.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const loginTemplate = (onSubmit) => html`
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
    // console.log('login')
}

async function onSubmit(ctx, data, e) {

    if (Object.values(data).some(v => v == '')) {
        return alert('All inputs must be filled');
    }

    try {
        await userService.login(data.email.trim(), data.password.trim());
        e.target.reset();
        ctx.page.redirect('/');

    } catch (error) {
        alert(error.message);
    }
}

