import { showHome } from "./home.js";
import { loadPage } from "./utils.js";

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');

export function showCreate() {
    loadPage(section)
}

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(form)

    const title = formData.get('title').trim()
    const description = formData.get('description').trim()
    const img = formData.get('img').trim()

    if (title == '' || description == '' || img == '') {
        return alert('All inputs must be filled!')
    }

    await createMovie(title, description, img)
    form.reset()
    showHome()
}

async function createMovie(title, description, img) {
    const user = JSON.parse(localStorage.getItem('user'))

    await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ title, description, img })
    });
}

