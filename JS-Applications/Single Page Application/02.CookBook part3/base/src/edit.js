import { showCatalog } from "./catalog.js";

const main = document.querySelector('main')

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    return recipe;
}

let editSection
let updateNavigation
let currentId

export function loadEdit(currentSection, setActiveNav) {

    editSection = currentSection
    updateNavigation = setActiveNav

    const form = editSection.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        onSubmit(Object.fromEntries(formData.entries()))
    })
}

async function onSubmit(data) {
    const body = JSON.stringify({
        name: data.name,
        img: data.img,
        ingredients: data.ingredients
            .split('\n')
            .map(l => l.trim())
            .filter(l => l != ''),
        steps: data.steps
            .split('\n')
            .map(l => l.trim())
            .filter(l => l != '')
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return alert('You are not logged in!')
    }

    try {
        const response = await fetch('http://localhost:3030/data/recipes/' + currentId, {
            method: 'put',
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

export async function showEdit(id) {
    updateNavigation()
    main.replaceChildren(editSection)
    currentId = id

    const recipe = await getRecipeById(id)
    editSection.querySelector('input[name="name"]').value = recipe.name;
    editSection.querySelector('input[name="img"]').value = recipe.img;
    editSection.querySelector('textarea[name="ingredients"]').value = recipe.ingredients.join('\n');
    editSection.querySelector('textarea[name="steps"]').value = recipe.steps.join('\n');

}