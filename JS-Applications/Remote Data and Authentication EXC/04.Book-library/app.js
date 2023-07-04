window.addEventListener('load', () => {
    const loadBtn = document.querySelector('#loadBooks')
    loadBtn.addEventListener('click', loadBooks)

    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const h3 = e.target.querySelector('h3')

        if (h3.textContent == 'FORM') {
            onSubmit(e)
        } else {
            onSave(e)
        }
    })

    const tBody = document.querySelector('tbody')
    tBody.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.tagName != 'BUTTON') {
            return
        }
        let trId = e.target.parentElement.parentElement.id

        if (e.target.textContent == 'Delete') {
            onDelete(trId)
        } else if (e.target.textContent == 'Edit') {
            onEdit(trId)
        }
    })
})

async function loadBooks(e) {
    if (e) {
        e.preventDefault()
    }

    const tBody = document.querySelector('tbody')
    tBody.innerHTML = ''

    const url = 'http://localhost:3030/jsonstore/collections/books'
    try {
        const res = await fetch(url)
        const data = await res.json()

        Object.entries(data).forEach(([id, book]) => tBody.appendChild(createTr(id, book)))
        console.log(data)
    } catch (err) {
        alert(err.message)
    }
}

async function onSubmit(e) {
    if (e) {
        e.preventDefault()
    }

    const url = 'http://localhost:3030/jsonstore/collections/books'

    const form = e.target
    const formData = new FormData(form)

    const title = formData.get('title').trim()
    const author = formData.get('author').trim()

    try {
        if (title == '' ||
            author == ''
        ) {
            throw new Error('All inputs must be filled!')
        }

        const res = await fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ author, title })
        })

        const data = await res.json()

        loadBooks()
        form.reset()
    } catch (err) {
        alert(err.message)
    }
}

async function onDelete(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id
    try {
        const res = await fetch(url, {
            method: 'delete'
        })

        loadBooks()
    } catch (err) {
        alert(err.message)
    }
}

async function onEdit(id) {
    const trEl = document.getElementById(`${id}`)

    console.log(trEl)
    const title = trEl.querySelector('td:nth-child(1)').textContent
    const author = trEl.querySelector('td:nth-child(2)').textContent

    document.querySelector('[name="title"]').value = title
    document.querySelector('[name="author"]').value = author

    document.querySelector('form h3').textContent = 'Edit FORM'
    const saveBtn = document.querySelector('form button')
    saveBtn.textContent = 'Save'

    saveBtn.addEventListener('click', onSave)

    async function onSave(e) {
        e.preventDefault()

        if (e.target.textContent != 'Save') {
            return
        }

        const url = 'http://localhost:3030/jsonstore/collections/books/' + id

        const title = document.querySelector('[name="title"]').value.trim()
        const author = document.querySelector('[name="author"]').value.trim()

        try {
            await fetch(url, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ author, title, _id: id })
            })
        } catch (err) {
            alert(err.message)

        }
        saveBtn.textContent = 'Submit'
        document.querySelector('form h3').textContent = 'FORM'
        document.querySelector('form').reset()
        loadBooks()

        saveBtn.removeEventListener('click', onSave)
    }
}

function createTr(id, bookObj) {
    const newEl = document.createElement('tr')
    newEl.id = id
    newEl.innerHTML = `<td>${bookObj.title}</td>
    <td>${bookObj.author}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>`

    return newEl
}