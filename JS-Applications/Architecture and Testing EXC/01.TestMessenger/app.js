function attachEvents() {

    const textArea = document.querySelector('textarea')
    const submitBtn = document.querySelector('#submit')

    const refreshBtn = document.querySelector('#refresh')

    const url = 'http://localhost:3030/jsonstore/messenger'

    refreshBtn.addEventListener('click', onRefresh)
    async function onRefresh(e) {
        e.preventDefault()

        textArea.textContent = ''

        try {
            const res = await fetch(url)
            const data = await res.json()


            let allMessages = Object.values(data)
                .map((message) => `${message.author}: ${message.content}`)
                .join('\n')

            let messagesNode = document.createTextNode(allMessages)
            textArea.appendChild(messagesNode)

        } catch (err) {
            alert(err.message)
        }
    }

    submitBtn.addEventListener('click', onSubmit)
    async function onSubmit(e) {
        e.preventDefault()

        const author = document.querySelector('[name="author"]').value.trim()
        const messageContent = document.querySelector('[name="content"]').value.trim()

        let newMessage = {
            author: author,
            content: messageContent,
        }


        try {
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMessage)
            })
            const data = await res.json()

            console.log(data)

        } catch (err) {
            alert(err.message)
        }
    }
}

attachEvents();