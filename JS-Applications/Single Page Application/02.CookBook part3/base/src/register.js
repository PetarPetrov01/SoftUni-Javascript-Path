import { showCatalog } from "./catalog.js";

const main = document.querySelector('main')

let registerSection;
let updateNavigation;

export function loadRegister(currentSection, setActiveNav) {
    registerSection = currentSection
    updateNavigation = setActiveNav

    const form = registerSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit(Object.fromEntries(formData.entries()));
    }));

    async function onSubmit(data) {
        if (data.password != data.rePass) {
            return console.error('Passwords don\'t match');
        }

        const body = JSON.stringify({
            email: data.email,
            password: data.password,
        });

        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });

            const data = await response.json()

            if (response.status == 200) {
                //set token and userId
                sessionStorage.setItem('authToken', data.accessToken)
                sessionStorage.setItem('userId', data._id)
                //change visibilty
                document.getElementById('user').style.display = 'inline-block'
                document.getElementById('guest').style.display = 'none'

                showCatalog()
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }
}

export function showRegister() {
    updateNavigation('registerLink')
    main.replaceChildren(registerSection)
}