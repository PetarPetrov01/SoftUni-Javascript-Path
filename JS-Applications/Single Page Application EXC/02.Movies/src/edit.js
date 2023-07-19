import { showHome } from "./home.js";
import { loadPage } from "./utils.js"

const editSection = document.querySelector('#edit-movie')
let movieId;

const form = editSection.querySelector('form')
form.addEventListener('submit', onSubmit)

async function onSubmit(e) {
    debugger
    e.preventDefault()
    const formData = new FormData(form)

    const title = formData.get('title').trim()
    const description = formData.get('description').trim()
    const img = formData.get('img').trim()

    if (title == '' || description == '' || img == '') {
        return alert('All inputs must be filled!')
    }

    await editMovie(title, description, img)
    form.reset()
    showHome()
}

export async function showEdit(e, movieId) {
    debugger
    e.preventDefault()
    loadPage(editSection)

    const movie = await getMovie(movieId)
    fillForm(movie)
}



function fillForm(movie) {
    editSection.querySelector('[name=title]').value = movie.title
    editSection.querySelector('[name=description]').textContent = movie.description
    editSection.querySelector('[name=img]').value = movie.img
    movieId = movie._id
}

async function getMovie(movieId) {
    const res = await fetch(`http://localhost:3030/data/movies/${movieId}`)
    const data = await res.json()

    return data
}

async function editMovie(title, description, img) {
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(movieId)
    await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ title, description, img })
    });
}
