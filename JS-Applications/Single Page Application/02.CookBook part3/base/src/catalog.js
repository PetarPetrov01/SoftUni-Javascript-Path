import { showDetails } from "./details.js";
import { e } from "./dom.js"

const main = document.querySelector('main')

let loadSection;
let updateNavigation

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();
    console.log(recipes)
    return recipes;
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: () => showDetails(recipe._id) },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    )

    return result
}

export function loadCatalog(currentSection, setActiveNav) {
    loadSection = currentSection
    updateNavigation = setActiveNav
}

export async function showCatalog() {
    updateNavigation('catalogLink')
    main.replaceChildren(loadSection)

    const recipes = await getRecipes()
    const recipeCards = recipes.map(createRecipePreview)
    main.replaceChildren(...recipeCards)
}