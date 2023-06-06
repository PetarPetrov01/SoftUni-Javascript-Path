function bSolve() {
    let inputsArr = Array.from(document.querySelectorAll('#container input'));
    const [nameInput, ageInput, kindInput, currentOwnerInput] = inputsArr;
    const addBtn = document.querySelector('#container button');

    const adoptionList = document.querySelector('#adoption ul');
    const adoptedList = document.querySelector('#adopted ul');

    addBtn.addEventListener('click', createNewLi);

    function createNewLi(e) {
        e.preventDefault();

        if (inputsArr.map(el => el.value).some(val => val == '') || Number.isNaN(Number(ageInput.value))) {
            return;
        };

        let contactBtn = createEl('button', {}, 'Contact with owner');
        let newLi = createEl('li', {},
            createEl('p', {},
                createEl('strong', {}, nameInput.value),
                ' is a ',
                createEl('strong', {}, ageInput.value),
                ' year old ',
                createEl('strong', {}, kindInput.value)
            ),
            createEl('span', {}, `Owner: ${currentOwnerInput.value}`),
            contactBtn
        );
        console.log(newLi)
        contactBtn.addEventListener('click', contactOwner);
        adoptionList.appendChild(newLi);
        inputsArr.forEach(inputEl => inputEl.value = '');

        function contactOwner() {
            const takeItBtn = createEl('button', {}, 'Yes! I take it!');
            const newNameInput = createEl('input', { placeholder: 'Enter your names' });
            const newDiv = createEl('div', {},
                newNameInput,
                takeItBtn
            );

            takeItBtn.addEventListener('click', adopt.bind(null, newLi, newNameInput))

            contactBtn.remove();
            newLi.appendChild(newDiv);
        }
    }

    function adopt(el, input) {
        let newOwner = input.value.trim()

        if (newOwner == '') {
            return
        }

        el.querySelector('div').remove();

        let checkBtn = createEl('button', {}, 'Checked');
        checkBtn.addEventListener('click', () => el.remove());
        el.appendChild(checkBtn);

        document.querySelector('span').textContent = `New Owner: ${newOwner}`;

        adoptedList.appendChild(el);
    }

    function createEl(elType, props, ...content) {
        let newEl = document.createElement(elType)

        for (let prop in props) {
            newEl[prop] = props[prop]
        };

        for (let el of content) {
            if (typeof el == 'string' || typeof el == 'number') {
                el = document.createTextNode(el)
            }
            newEl.appendChild(el)
        };

        return newEl;
    }
}

