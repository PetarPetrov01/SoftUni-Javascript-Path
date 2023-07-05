function catches() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        document.querySelector(".email span").textContent = user.email;
        document.querySelector("#guest").style.display = "none";
        document.querySelector("#addForm .add").disabled = false;
        loadData();
    } else {
        document.getElementById("user").style.display = "none";
    }

    const catchesDiv = document.querySelector('div#catches')

    const loadBtn = document.querySelector('.load')
    loadBtn.addEventListener('click', (e) => {
        e.preventDefault()
        loadData()
    })

    const addForm = document.querySelector('#addForm')
    addForm.addEventListener('submit', onAdd)

    document.querySelector('#main').addEventListener('click', delegateButtons)

    const logoutBtn = document.querySelector('#logout')
    logoutBtn.addEventListener('click', onLogout)

    async function onLogout(e) {
        e.preventDefault()
        const url = 'http://localhost:3030/users/logout'
        await fetch(url, {
            headers: {
                "X-Authorization": user.token
            }
        })

        localStorage.clear()
        document.querySelector('#logout').style.display = 'none'
        document.querySelector("#addForm .add").disabled = true;
        document.querySelector("#guest").style.display = "inline-block";
        document.querySelector(".email span").textContent = 'guest';
        location.reload()
    }

    function delegateButtons(e) {
        e.preventDefault()

        const currentBtn = e.target.textContent
        const currId = e.target.id === '' ? e.target.dataset.id : e.target.id
        const currentEl = e.target.parentElement

        if (currentBtn == 'Delete') {
            deleteCatch(currId)
        } else if (currentBtn == 'Update') {
            updateCatch(currId, currentEl)
        }
    }

    async function deleteCatch(id) {
        const url = 'http://localhost:3030/data/catches/' + id
        await fetch(url, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.token,
            }
        })
        loadData()
    }

    async function updateCatch(id, catchEl) {
        let [angler, weight, species, location, bait, captureTime] =
            Array.from(catchEl.querySelectorAll('input'))
                .map(el => el.value)

        console.log(angler, weight, species, location, bait, captureTime)

        const url = 'http://localhost:3030/data/catches/' + id
        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": user.token,
                }, body: JSON.stringify({
                    angler,
                    weight: Number(weight),
                    species,
                    location,
                    bait,
                    captureTime: Number(captureTime)
                })
            })

            if (res.ok == false) {
                const error = await res.json();
                throw new Error(error.message);
            }

            loadData()
        } catch (error) {
            alert(error.message)
        }
    }

    async function onAdd(e) {
        e.preventDefault()

        const url = 'http://localhost:3030/data/catches'

        if (!user) {
            window.location = '/login.html'
        }

        const form = e.target
        const formData = new FormData(form)

        const data = Object.fromEntries(formData)

        try {
            if (Object.values(data).some(v => v == '')) {
                throw new Error('All inputs must be filled!')
            }

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": user.token
                },
                body: JSON.stringify(data)
            })
            loadData()
            e.target.reset()

        } catch (err) {
            alert(err.message)
        }
    }

    async function loadData() {

        const url = 'http://localhost:3030/data/catches'
        try {
            const res = await fetch(url)
            const data = await res.json()

            const result = data
                .map(catchInfo => catchesDiv.appendChild(loadCatch(catchInfo)))
            catchesDiv.replaceChildren(...result)

            // catchesDiv.innerHTML = ''
            // data.forEach(catchInfo => catchesDiv.appendChild(loadCatch(catchInfo)))
        } catch (err) {
            alert(err.message)
        }
    }

    function loadCatch(obj) {


        const isDisabled = user && obj._ownerId == user.id ? false : true

        const newDiv = document.createElement('div')
        newDiv.classList.add('catch')

        newDiv.innerHTML = `<label>Angler</label>
        <input type="text" class="angler" value="${obj.angler}" ${isDisabled ? 'disabled' : ''}>
        <label>Weight</label>
        <input type="text" class="weight" value="${obj.weight}" ${isDisabled ? 'disabled' : ''}>
        <label>Species</label>
        <input type="text" class="species" value="${obj.species}" ${isDisabled ? 'disabled' : ''}>
        <label>Location</label>
        <input type="text" class="location" value="${obj.location}" ${isDisabled ? 'disabled' : ''}>
        <label>Bait</label>
        <input type="text" class="bait" value="${obj.bait}" ${isDisabled ? 'disabled' : ''}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${obj.captureTime}" ${isDisabled ? 'disabled' : ''}>
        <button class="update" data-id="${obj._id}" ${isDisabled ? 'disabled' : ''}>Update</button>
        <button class="delete" data-id="${obj._id}" ${isDisabled ? 'disabled' : ''}>Delete</button>`
        return newDiv
    }
}

catches()