import { showEdit } from "./edit.js";
import { showHome } from "./home.js";
import { loadPage } from "./utils.js";

const section = document.querySelector('#movie-example')

export function showDetails(id) {
    loadPage(section)
    showMovie(id)
}

async function showMovie(id) {

    const user = JSON.parse(localStorage.getItem('user'))
    const [movie, likes, ownLikes] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLikes(id, user)
    ])

    section.replaceChildren(createMovieCard(movie, user, likes, ownLikes))
}

function createMovieCard(movie, user, likes, ownLikes) {
    debugger
    const newEl = document.createElement('div')
    newEl.className = 'container'
    newEl.innerHTML = `<div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
      <img class="img-thumbnail" src="${movie.img}"
        alt="Movie" />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        ${movie.description}
      </p>
      ${controls(movie, user, ownLikes)}
      <span class="enrolled-span">Liked ${likes}</span>
    </div>
  </div>`

    const likeBtn = newEl.querySelector('.like-btn')
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    const editBtn = newEl.querySelector('.edit-btn')
    if (editBtn) {
        editBtn.addEventListener('click', (e) => showEdit(e, movie._id))
    }

    const deleteBtn = newEl.querySelector('.delete-btn')
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => deleteMovie(e, movie._id))
    }



    return newEl;
}

function controls(movie, user, ownLikes) {
    const isCurrentOwner = user && user._id == movie._ownerId

    let buttons = []
    debugger
    console.log(ownLikes)
    if (isCurrentOwner) {
        buttons.push(`<a class="btn btn-danger delete-btn" href="#">Delete</a>`)
        buttons.push(`<a class="btn btn-warning edit-btn" href="#">Edit</a>`)
    } else if (user && ownLikes == false) {
        buttons.push(`<a class="btn btn-primary like-btn" href="#">Like</a>`)
    }
    buttons.push()

    return buttons.join('')
}

async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`)
    const movie = await res.json()

    return movie
}

async function getLikes(id) {
    debugger
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json()
    console.log(likes)

    return likes
}

async function getOwnLikes(movieId, user) {
    debugger
    if (!user) {
        return false
    } else {
        const userId = user._id
        const res =  await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const ownLikes = await res.json()

        return ownLikes.length > 0;
    }
}

async function likeMovie(e, movieId) {
    debugger
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))

    await fetch('http://localhost:3030/data/likes', {
        method: 'post',
        headers: {
            "Content-type": "application-json",
            "X-Authorization": user.accessToken
        },
        body: JSON.stringify({ movieId })
    })

    showDetails(movieId)
}

async function deleteMovie(e, movieId) {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'Delete',
            headers: {
                "X-Authorization": user.accessToken
            }
        })

        showHome()
    } catch (error) {
        alert(error.message)
    }
}