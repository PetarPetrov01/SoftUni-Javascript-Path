function solve() {
    let inputsArr = Array.from(document.querySelectorAll('#container input'))
    const [nameInput, ageInput, kindInput, currentOwnerInput] = inputsArr
    const addBtn = document.querySelector('#container button')

    const adoptionList = document.querySelector('#adoption ul')
    const adoptedList = document.querySelector('#adopted ul')

    addBtn.addEventListener('click', (e) => {
        e.preventDefault()

        if (nameInput.value && Number(ageInput.value) && kindInput.value && currentOwnerInput.value) {
            createNewLi()
            inputsArr.forEach(inputEl => inputEl.value = '')
        }
    })

    function createNewLi() {
        let newLi = document.createElement('li')
        let newP = createEl('p')

        newP.appendChild(createEl('strong', nameInput.value))
        newP.appendChild(document.createTextNode(' is a '))
        newP.appendChild(createEl('strong', ageInput.value))
        newP.appendChild(document.createTextNode(' year old '))
        newP.appendChild(createEl('strong', kindInput.value))

        newLi.appendChild(newP)
        let ownerInfo = createEl('span', `Owner: ${currentOwnerInput.value}`)
        newLi.appendChild(ownerInfo)

        let contactBtn = createEl('button', 'Contact with owner')
        newLi.appendChild(contactBtn)
        contactBtn.addEventListener('click', (e) => {
            e.target.remove()
            let newDiv = document.createElement('div')

            let takeItBtn = createEl('button', 'Yes! I take it!')

            let newNameInput = document.createElement('input')
            newNameInput.setAttribute('placeholder', 'Enter your names')

            takeItBtn.addEventListener('click', (e) => {

                if (newNameInput.value) {
                    console.log(newNameInput.value)
                    ownerInfo.textContent = `New Owner: ${newNameInput.value}`
                    adoptedList.appendChild(newLi)

                    newNameInput.remove()
                    e.target.remove()
                    newDiv.remove()

                    let checkBtn = createEl('button', 'Checked')
                    checkBtn.addEventListener('click', () => newLi.remove())
                    newLi.appendChild(checkBtn)
                }
            })
            newDiv.appendChild(newNameInput)
            newDiv.appendChild(takeItBtn)

            newLi.appendChild(newDiv)
        })

        adoptionList.appendChild(newLi)
    }

    function createEl(elType, content) {
        let newEl = document.createElement(elType)
        newEl.textContent = content

        return newEl
    }
}

