function register() {
    const form = document.querySelector('form#register')
    form.addEventListener('submit', onRegister)

    async function onRegister(e) {
        e.preventDefault()

        const url = 'http://localhost:3030/users/register'

        const form = e.target
        const formData = new FormData(form)

        const email = formData.get('email').trim()
        const password = formData.get('password').trim()
        const rePass = formData.get('rePass').trim()

        try {
            if (password != rePass) {
                throw new Error('The passwords do not match!')
            }

            const res = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            console.log(res.status)
            if (res.status != 200) {
                const error = await res.json()
                throw new Error(error.message)
            }
            const data = await res.json()
            
            const user = {
                email: data.email,
                token: data.accessToken,
                id: data._id
            }
            localStorage.setItem('user', JSON.stringify(user))

            window.location = '/index.html'
        } catch (err) {
            alert(err)
        }
    }
}
register()