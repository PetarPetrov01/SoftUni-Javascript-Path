function attachEvents() {
    const loadButton = document.querySelector('#btnLoadPosts')
    loadButton.addEventListener('click', loadPosts)

    const viewButton = document.querySelector('#btnViewPost')
    viewButton.addEventListener('click', viewPosts)

    let postsObj = {}
}

async function loadPosts() {
    const response = await fetch('http://localhost:3030/jsonstore/blog/posts')
    postsObj = await response.json()

    Object.entries(postsObj).forEach(([key, postObj]) => {
        let optionEl = document.createElement('option')
        optionEl.value = key
        optionEl.textContent = postObj.title

        document.querySelector('#posts').appendChild(optionEl)
    })
}

async function viewPosts() {
    const h1 = document.querySelector('#post-title')
    const paragraph = document.querySelector('#post-body')
    const commentsUl = document.querySelector('#post-comments')

    const response = await fetch(`http://localhost:3030/jsonstore/blog/comments`)
    const allComments = await response.json()

    let selectEl = document.querySelector('#posts')
    let selectedOption = Array.from(selectEl.children)[selectEl.selectedIndex]

    const filteredComments = Object.values(allComments).filter((postObj) => {
        return postObj.postId == selectedOption.value
    })

    //Clear all content
    h1.innerHTML = ''
    paragraph.innerHTML = ''
    commentsUl.innerHTML = ''

    h1.textContent = selectedOption.textContent
    paragraph.textContent = postsObj[selectedOption.value].body

    for (let comment of filteredComments) {
        let newLi = document.createElement('li')
        newLi.textContent = comment.text
        commentsUl.appendChild(newLi)
    }
}

attachEvents();