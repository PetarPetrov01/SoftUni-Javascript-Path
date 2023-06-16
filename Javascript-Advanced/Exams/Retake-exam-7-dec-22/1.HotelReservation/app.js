window.addEventListener('load', solve);

function solve() {
    const inputsArr = Array.from(document.querySelectorAll(`.container-text input`));

    const infoList = document.querySelector('.info-list');
    const confirmList = document.querySelector('.confirm-list')
    const nextBtn = document.querySelector('#next-btn');

    let editBtn;
    let continueBtn;

    let firstName;
    let lastName;
    let checkIn;
    let checkOut;
    let numberOfGuests;

    nextBtn.addEventListener('click', validateInput);

    function validateInput(e) {
        e.preventDefault()

        //Read inputs
        firstName = inputsArr[0].value;
        lastName = inputsArr[1].value;
        checkIn = inputsArr[2].value;
        checkOut = inputsArr[3].value;
        numberOfGuests = inputsArr[4].value;

        if (inputsArr.some(i => i.value == '') || new Date(inputsArr[2].value) > new Date(inputsArr[3].value)) {
            return
        }
        createLi()

        //Disable Next button
        nextBtn.setAttribute('disabled', 'true');

        //clear inputs
        inputsArr.forEach((input) => input.value = '');
        console.log(inputsArr);
    }

    function createLi() {
        let newLi = document.createElement('li');
        newLi.classList.add('reservation-content');

        newLi.innerHTML = `<article>
            <h3>Name: ${firstName} ${lastName}</h3>
            <p>From date: ${checkIn}</p>
            <p>To date: ${checkOut}</p>
            <p>For ${numberOfGuests} people</p>
        </article>
        <button class="edit-btn">Edit</button>
        <button class="continue-btn">Continue</button>
        `
        infoList.appendChild(newLi)

        editBtn = document.querySelector('.edit-btn')
        continueBtn = document.querySelector('.continue-btn')

        editBtn.addEventListener('click', editInputs)
        continueBtn.addEventListener('click', continueReservation)

        function editInputs() {
            nextBtn.removeAttribute('disabled');

            inputsArr[0].value = firstName
            inputsArr[1].value = lastName
            inputsArr[2].value = checkIn
            inputsArr[3].value = checkOut
            inputsArr[4].value = numberOfGuests

            newLi.remove()
        }

        function continueReservation() {
            const verification = document.querySelector('#verification')
            debugger
            confirmList.appendChild(newLi)

            Array.from(newLi.querySelectorAll('button')).forEach(btn => btn.remove())

            const confirmBtn = document.createElement('button')
            const cancelBtn = document.createElement('button')

            confirmBtn.classList.add('confirm-btn')
            confirmBtn.textContent = 'Confirm'
            newLi.appendChild(confirmBtn)

            cancelBtn.classList.add('cancel-btn')
            cancelBtn.textContent = 'Cancel'
            newLi.appendChild(cancelBtn)

            confirmBtn.addEventListener('click', (e) => {
                verification.className =''
                verification.classList.add('reservation-confirmed')
                verification.textContent = 'Confirmed.'
                nextBtn.removeAttribute('disabled')
                newLi.remove()
            })

            cancelBtn.addEventListener('click', (e) => {
                verification.className =''
                verification.classList.add('reservation-cancelled')
                verification.textContent = 'Cancelled.'
                nextBtn.removeAttribute('disabled')
                newLi.remove()
            })

        }
    }
}





