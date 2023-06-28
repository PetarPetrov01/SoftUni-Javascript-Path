window.onload(solution())

async function solution() {
    const section = document.querySelector('#main')
    const articlesArr = await getArticles()

    articlesArr.forEach(async (article) => {
        const articleDetails = await getDetails(article._id)

        let newDiv = document.createElement('div')
        newDiv.classList.add('accordion')
        newDiv.innerHTML = `<div class="head">
            <span>${article.title}</span>
            <button class="button" id="${article._id}">More</button>
        <div class="extra" style="display:none">
            <p>${articleDetails.content}
            </p>
        </div>
        `
        section.appendChild(newDiv)
    })

    section.addEventListener('click', (e) => {
        if (e.target.tagName != "BUTTON") return

        let extraDiv = e.target.parentElement.parentElement.querySelector('.extra')

        if (e.target.textContent == 'More') {
            extraDiv.style.display = 'inline-block'
            e.target.textContent = 'Less'
        } else {
            extraDiv.style.display = 'none'
            e.target.textContent = 'More'

        }
    })
}

async function getArticles() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    return response.json()
}

async function getDetails(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
    return response.json()
}