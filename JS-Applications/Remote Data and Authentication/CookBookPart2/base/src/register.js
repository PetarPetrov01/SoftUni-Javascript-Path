window.addEventListener('load', async () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', onRegister)
})

async function onRegister(e) {
    console.log('prase')
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const rePass = formData.get('rePass').trim()

    const url = 'http://localhost:3030/users/register'
    try {
        if (password != rePass) {
            throw new Error('The passwords do not match!')
        }


        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        if (response.ok == false) {
            const error = await response.json()
            throw new Error(error.message)
        }

        const data = await response.json()
        const token = data.accessToken

        localStorage.setItem('token', token)

        window.location = 'http://127.0.0.1:5500/Remote%20Data%20and%20Authentication/base/index.html'
    } catch (err) {
        alert(err.message)
    }
}

