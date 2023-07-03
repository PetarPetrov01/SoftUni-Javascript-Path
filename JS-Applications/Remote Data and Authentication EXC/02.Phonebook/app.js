function attachEvents() {
    const loadBtn = document.querySelector('#btnLoad')
    const createBtn = document.querySelector('#btnCreate')
    const phoneBook = document.querySelector('#phonebook')

    const url = 'http://localhost:3030/jsonstore/phonebook'

    loadBtn.addEventListener('click', onLoad)
    createBtn.addEventListener('click', onCreate)
    phoneBook.addEventListener('click', onDelete)

    async function onLoad(e) {
        e.preventDefault()

        phoneBook.innerHTML = ''


        try {
            const res = await fetch(url)
            const data = await res.json()

            Object.values(data).forEach((obj) => {
                let newEl = document.createElement('li')
                newEl.textContent = `${obj.person}: ${obj.phone}`
                newEl.id = obj._id

                let delBtn = document.createElement('button')
                delBtn.textContent = 'Delete'

                newEl.appendChild(delBtn)
                phoneBook.appendChild(newEl)
            })
        } catch (err) {
            alert(err.message)
        }


    }

    async function onCreate(e) {
        e.preventDefault()

        const personEl = document.querySelector('#person')
        const phoneEl = document.querySelector('#phone')

        const person = personEl.value.trim()
        const phone = phoneEl.value.trim()

        try {
            if (person == '' || phone == '') {
                throw new Error('All inputs must be filled!')
            }

            const res = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ person, phone })
            })

            personEl.value = ''
            phoneEl.value = ''

            onLoad(e)
        } catch (err) {
            alert(err.message)
        }
    }

    async function onDelete(e) {
        if (e.target.tagName != "BUTTON") {
            return
        }
        let messageId = e.target.parentElement.id

        try {
            const res = await fetch(`${url}/${messageId}`, {
                method: 'Delete'
            })

            onLoad(e)
        } catch (err) {
            alert(err)
        }

        console.log(messageId)
    }
}

attachEvents();