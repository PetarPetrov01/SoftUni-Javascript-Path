import { getIdeas } from "../api/data.js";

const section = document.querySelector('#dashboard-holder');
section.addEventListener('click', onDetails)

let ctx;
export async function showCatalog(context) {
    ctx = context

    context.showSection(section)
    const ideas = await getIdeas()
    if (!ideas) {
        section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>'
    } else {
        section.replaceChildren(...ideas.map(createIdeaPreview))
    }
}

function createIdeaPreview(idea) {
    const divEl = document.createElement('div')
    divEl.className = 'card overflow-hidden current-card details'
    divEl.style.width = '20rem';
    divEl.style.height = '18rem';

    divEl.innerHTML = `<div class="card-body">
    <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src="${idea.img}" alt="Card image cap">
        <a data-id="${idea._id}" class="btn" href="/details">Details</a>
        </div>
            `

    return divEl
}

function onDetails(e) {
    if (e.target.tagName == 'A') {
        e.preventDefault()
        const id = e.target.dataset.id
        if (id) {
            ctx.goTo('/details', id)
        }
    }
}
