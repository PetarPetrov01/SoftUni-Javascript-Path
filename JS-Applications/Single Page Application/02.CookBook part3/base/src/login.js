import { showCatalog } from "./catalog.js";

const main = document.querySelector('main')
let loginSection;
let updateNavigation;

export function loadLogin(currentSection, setActiveNav) {
    loginSection = currentSection
    updateNavigation = setActiveNav

    const form = loginSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onLogin(Object.fromEntries(formData.entries()));
    }));

    async function onLogin(data) {


        const body = JSON.stringify({
            email: data.email,
            password: data.password,
        });

        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
            const data = await response.json();
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
            console.error(err.message);
        }
    }
}

export function showLogin() {
    updateNavigation('loginLink')
    main.replaceChildren(loginSection)
}