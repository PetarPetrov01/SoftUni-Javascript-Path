import { deleteIdea, getIdeaById } from "../api/data.js";

const section = document.querySelector('#detailsPage');

export async function showDetails(context, id) {
    console.log(id)
    const idea = await getIdeaById(id)

    console.log(idea)
    context.showSection(section)

    const user = JSON.parse(localStorage.getItem('user'))
    const isOwner = user && user._id == idea._ownerId

    section.innerHTML = createDetailsPreview(idea, isOwner)
    if (isOwner) {
        document.querySelector('#deleteBtn').addEventListener('click', async (e) => {
            e.preventDefault()
            const choice = confirm('Are you sure you want to delete this idea?')
            if (choice) {
                deleteIdea(id)
                context.goTo('/catalog')
            }
        })
    }

}

function createDetailsPreview(idea, isOwner) {
    let el = `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    `
    if (isOwner) {
        el += `<div class="text-center">
            <a id="deleteBtn" class="btn detb" href="">Delete</a>
        </div> `
    }

    return el
}

/**
 <img class="det-img" src="./images/dinner.jpg" />
<div class="desc">
    <h2 class="display-5">Dinner Recipe</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a
        long
        day. With so many easy pasta recipes out there, there's something for every palate to love. That's
        why
        pasta
        makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to
        its
        versatility.</p>
</div>
<div class="text-center">
    <a class="btn detb" href="">Delete</a>
</div> 
 
 */