import { showCatalog } from "./catalog.js";

const main = document.querySelector('main')

let createSection
let updateNavigation

export function loadCreate(currentSection, setActiveNav) {
    createSection = currentSection
    updateNavigation = setActiveNav

    const form = createSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));

    async function onSubmit(data) {
        const body = JSON.stringify({
            name: data.name,
            img: data.img,
            ingredients: data.ingredients.
                split('\n')
                .map(l => l.trim())
                .filter(l => l != ''),
            steps: data.steps
                .split('\n')
                .map(l => l.trim())
                .filter(l => l != '')
        });

        const token = sessionStorage.getItem('authToken');
        if (token == null) {
            return window.location.pathname = 'index.html';
        }

        try {
            const response = await fetch('http://localhost:3030/data/recipes', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body
            });

            if (response.status == 200) {
                showCatalog()
            } else {
                throw new Error(await response.json());
            }
        } catch (err) {
            console.error(err.message);
        }
    }


}

export function showCreate() {
    updateNavigation('createLink')
    main.replaceChildren(createSection)
}