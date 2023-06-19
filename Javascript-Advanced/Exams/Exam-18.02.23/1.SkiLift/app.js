window.addEventListener('load', solve);

function solve() {
    const firstNameElement = document.querySelector('#first-name')
    const lastNameElement = document.querySelector('#last-name')
    const numberOfPeopleElement = document.querySelector('#people-count')
    const fromDayElement = document.querySelector('#from-date')
    const daysElement = document.querySelector('#days-count')
    const nextBtn = document.querySelector('#next-btn')
    const previewList = document.querySelector('.ticket-info-list')
    const confirmList = document.querySelector('.confirm-ticket')

    nextBtn.addEventListener('click', onNext)

    function onNext(e) {
        e.preventDefault()

        //Validate input
        if (firstNameElement.value == '' ||
            lastNameElement.value == '' ||
            numberOfPeopleElement.value == '' ||
            fromDayElement.value == '' ||
            daysElement.value == ''
        ) {
            return
        }

        //Create li element with all its children
        let liElement = document.createElement('li')
        liElement.className = 'ticket'

        let articleElement = document.createElement('article')

        let headElement = document.createElement('h3')
        headElement.textContent = `Name: ${firstNameElement.value} ${lastNameElement.value}`

        let startDayParagraph = document.createElement('p')
        startDayParagraph.textContent = `From date: ${fromDayElement.value}`

        let daysParagraph = document.createElement('p')
        daysParagraph.textContent = `For ${daysElement.value} days`

        let peopleCountParagraph = document.createElement('p')
        peopleCountParagraph.textContent = `For ${numberOfPeopleElement.value} people`

        let editBtn = document.createElement('button')
        editBtn.setAttribute('class', 'edit-btn')
        editBtn.textContent = 'Edit'

        let continueBtn = document.createElement('button')
        continueBtn.setAttribute('class', 'continue-btn')
        continueBtn.textContent = 'Continue'

        //Append all elements
        articleElement.appendChild(headElement)
        articleElement.appendChild(startDayParagraph)
        articleElement.appendChild(daysParagraph)
        articleElement.appendChild(peopleCountParagraph)

        liElement.appendChild(articleElement)
        liElement.appendChild(editBtn)
        liElement.appendChild(continueBtn)

        previewList.appendChild(liElement)

        //Disable the button
        nextBtn.disabled = true

        //Get variables for all current values before clearing the input
        let editFirstName = firstNameElement.value
        let editLastName = lastNameElement.value
        let editNumberOfPeople = numberOfPeopleElement.value
        let editFirstDay = fromDayElement.value
        let editDays = daysElement.value

        //Clear all inputs
        firstNameElement.value = ''
        lastNameElement.value = ''
        numberOfPeopleElement.value = ''
        fromDayElement.value = ''
        daysElement.value = ''

        //Add events to edit button
        editBtn.addEventListener('click', onEdit)
        function onEdit(e) {
            e.preventDefault()

            firstNameElement.value = editFirstName
            lastNameElement.value = editLastName
            numberOfPeopleElement.value = editNumberOfPeople
            fromDayElement.value = editFirstDay
            daysElement.value = editDays

            //remove the li element
            liElement.remove()

            //Enable the button again
            nextBtn.disabled = false
        }

        continueBtn.addEventListener('click', onContinue)
        function onContinue(e) {
            e.preventDefault()

            confirmList.appendChild(liElement)
            liElement.classList.replace('ticket', 'ticket-content')

            //delete old buttons and create new ones
            continueBtn.remove()
            editBtn.remove()

            let confirmBtn = document.createElement('button')
            confirmBtn.setAttribute('class', 'confirm-btn')
            confirmBtn.textContent = 'Confirm'

            let cancelBtn = document.createElement('button')
            cancelBtn.setAttribute('class', 'cancel-btn')
            cancelBtn.textContent = "Cancel"

            liElement.appendChild(confirmBtn)
            liElement.appendChild(cancelBtn)

            cancelBtn.addEventListener('click', onCancel)
            function onCancel(e) {
                e.preventDefault()

                liElement.remove()
                nextBtn.disabled = false
            }

            confirmBtn.addEventListener('click', onConfirm)
            function onConfirm(e) {
                e.preventDefault()

                document.querySelector('#main').remove()

                let h1Element = document.createElement('h1')
                h1Element.setAttribute('id', 'thank-you')
                h1Element.textContent = "Thank you, have a nice day! "

                let backBtn = document.createElement('button')
                backBtn.setAttribute('id', 'back-btn')
                backBtn.textContent = "Back "

                document.querySelector('body').appendChild(h1Element)
                document.querySelector('body').appendChild(backBtn)

                backBtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    location.reload()
                })
            }
        }
    }
}




