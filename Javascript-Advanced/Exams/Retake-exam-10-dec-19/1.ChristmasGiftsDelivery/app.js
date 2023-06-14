function solution() {
    //Get reference to all elements
    const sections = Array.from(document.querySelectorAll('section'));
    const [, listSection, sentSection, discardedSection] = sections;
    const addBtn = document.querySelector('button');
    let input = document.querySelector('input');

    //Add functionality to Add button
    addBtn.addEventListener('click', addGift)

    function addGift() {
        if (!input.value.trim()) {
            return
        }

        //Create the element and append it
        let newLi = createEl('li', { class: 'gift' },
            `${input.value}`,
            createEl('button', { id: 'sendButton' }, 'Send'),
            createEl('button', { id: 'discardButton' }, 'Discard')
        )
        const giftList = listSection.querySelector('ul')
        giftList.appendChild(newLi)

        Array.from(newLi.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', manageGift))

        //Sort the gifts
        Array.from(giftList.children).sort((fLi, sLi) => fLi.textContent.localeCompare(sLi.textContent))
            .forEach(li => giftList.appendChild(li))

        //Clear input
        input.value = ''
    }

    function createEl(type, args, ...content) {
        let newEl = document.createElement(type)

        for (let prop in args) {
            if (prop == 'class') {
                newEl.classList.add(args[prop])
            } else {
                newEl[prop] = args[prop]
            }
        }

        for (let el of content) {
            if (typeof el === 'string' || typeof el === 'number') {
                el = document.createTextNode(el.trim())
            }
            newEl.appendChild(el)
        }
        return newEl
    }

    //Add functionality to Send and discard buttons
    function manageGift(e) {
        let currentLi = e.target.parentElement
        Array.from(currentLi.querySelectorAll('button'))
            .forEach(b => currentLi.removeChild(b))

        //Append to sent list
        if (e.target.textContent == 'Send') {
            sentSection.querySelector('ul').appendChild(currentLi)
        } else if (e.target.textContent == 'Discard') {
            discardedSection.querySelector('ul').appendChild(currentLi)
        }

    }
}