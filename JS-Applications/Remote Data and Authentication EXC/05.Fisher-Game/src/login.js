function login() {
    const form = document.querySelector('form#login')

    form.addEventListener('submit', onLogin)

    async function onLogin(e) {
        e.preventDefault()

        const url = 'http://localhost:3030/users/login'

        const form = e.target
        const formData = new FormData(form)

        const email = formData.get('email').trim()
        const password = formData.get('password').trim()

        try {
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
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

login()