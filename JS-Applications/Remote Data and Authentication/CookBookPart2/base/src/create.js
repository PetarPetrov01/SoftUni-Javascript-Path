window.addEventListener('load', () => {
    const token = localStorage.getItem('token')
    if (token == null) {
        window.location = 'http://127.0.0.1:5500/Remote%20Data%20and%20Authentication/base/index.html'
    }

    const form = document.querySelector('form')
    form.addEventListener('submit', onCreate)
})

async function onCreate(e) {
    e.preventDefault()

    console.log('asdas')

    const url = 'http://localhost:3030/data/recipes/'

    const form = e.target
    const formData = new FormData(form)

    const name = formData.get('name').trim()
    const img = formData.get('img').trim()
    const ingredients = formData.get('ingredients').trim().split('\n')
    const steps = formData.get('steps').trim().split('\n')

    const newRecipe = {
        name, img, ingredients, steps
    }

    const token = localStorage.getItem('token')


    try {
        const res = await fetch(url, {
            method: 'post',

            headers: {
                "Content-Type": "application/json",
                "X-Authorization": token
            },
            body: JSON.stringify(newRecipe)
        })

        if (res.ok == false) {
            const error = await res.json()
            throw new Error(error.message)
        }

        window.location = 'http://127.0.0.1:5500/Remote%20Data%20and%20Authentication/base/index.html'
    } catch (err) {
        alert(err.message)
    }
}