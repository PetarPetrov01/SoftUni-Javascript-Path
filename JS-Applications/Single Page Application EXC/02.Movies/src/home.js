import { showDetails } from "./details.js"
import { loadPage } from "./utils.js"

const homeSection = document.querySelector('#home-page')
const movieList = homeSection.querySelector('#movies-list')
movieList.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        e.preventDefault()
        const movieId = e.target.dataset.id
        showDetails(movieId)
    }
})

export async function showHome() {
    loadPage(homeSection)
    showMovies()

}

async function showMovies() {
    const movies = await getMovies()
    movieList.replaceChildren(...movies.map(createMoviePreview))
}

function createMoviePreview(movie) {
    const newMovieEl = document.createElement('li')
    newMovieEl.className = 'card mb-4'
    newMovieEl.innerHTML = `<img class="card-img-top" src=${movie.img} alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a id="detailsLink" href="#" data-id="${movie._id}">
            <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>`

    return newMovieEl
}

async function getMovies() {
    const res = await fetch('http://localhost:3030/data/movies')
    const data = await res.json()

    return data
}
