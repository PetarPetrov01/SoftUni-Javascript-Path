import { register } from "../api/auth.js"
import { html } from "../lib.js"

const registerTemplate = (onSubmit, errors) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (errors.email ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (errors.password ? ' is-invalid' : '')}  id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${"form-control" + (errors.rePass ? ' is-invalid' : '')}  id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`

export function registerPage(ctx) {
    update({})

    function update(errors) {
        ctx.render(registerTemplate(onSubmit, errors))
    }

    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const email = formData.get('email').trim()
        const password = formData.get('password').trim()
        const rePass = formData.get('rePass').trim()

        try {
            if (email == '' || password == '') {
                throw {
                    error: new Error('All inputs must be filled!'),
                    errors: {
                        email: email == '',
                        password: password == ''
                    }
                }
            }

            if (rePass != password) {
                throw {
                    error: new Error('Passowords don\'t match!'),
                    errors: {
                        password: true,
                        rePass: true
                    }
                }
            }

            await register(email, password)
            ctx.updateNav()
            ctx.page.redirect('/')
        } catch (err) {
            update(err.errors || {})
        }
    }
}