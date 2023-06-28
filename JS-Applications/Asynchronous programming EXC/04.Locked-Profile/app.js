async function lockedProfile() {
    const main = document.querySelector('main')
    main.addEventListener('click', ShowOrHide)

    const profiles = await getProfiles()
    let counter = 1
    console.log(profiles)

    Object.values(profiles).forEach((profObj) => {
        let profile = createProfile(profObj, counter)
        main.appendChild(profile)

        counter++
    })
}

async function getProfiles() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles')

    try {
        if (response.ok == false || response.status != 200) {
            throw (`${response.status} : ${response.statusText}`)
        }
    } catch (err) {
        console.log(err)
    }

    return response.json()
}

function createProfile(profile, count) {
    let divEl = document.createElement('div')
    divEl.classList.add('profile')

    divEl.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user${count}Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user${count}Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user${count}Username" value="${profile.username}" disabled readonly />
    <div id="user${count}HiddenFields" style="display: none">
        <hr>
        <label>Email:</label>
        <input type="email" name="user${count}Email" value="${profile.email}" disabled readonly />
        <label>Age:</label>
        <input type="email" name="user${count}Age" value="${profile.age}" disabled readonly />
    </div>
    <button>Show more</button>
    `

    return divEl
}

function ShowOrHide(e) {
    if (e.target.tagName != "BUTTON") return

    const profileDiv = e.target.parentElement
    const showButton = profileDiv.querySelector('button')
    const hiddenDiv = profileDiv.querySelector('div')

    if (!profileDiv.querySelector('input[value="lock"]').checked) {
        
        if (showButton.textContent == 'Show more') {
            hiddenDiv.style.display = ''
            showButton.textContent = 'Hide it'
        } else {
            hiddenDiv.style.display = 'none'
            showButton.textContent = 'Show more'
        }
    }
}