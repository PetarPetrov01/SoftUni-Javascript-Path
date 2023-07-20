import { html } from '../dom.js';
import { getRecipes, getRecipeCount } from '../api/data.js';


const catalogTemplate = (recipes, goTo, page, pagesCount) => html`
<section id="catalog">
    <header class="section-title">${pagerTemplate(goTo, page, pagesCount)}</header>
    ${recipes.map(recipe => recipeTemplate(recipe, goTo))}
    <footer class="section-title">${pagerTemplate(goTo, page, pagesCount)}</footer>
</section>
`

const pagerTemplate = (goTo, page, pagesCount) => html`
Page ${page} of ${pagesCount}
${page > 1 ? html`<a class="pager" href="/catalog" @click=${event => changePage(event, goTo, page - 1)}>&lt; Prev</a>` : ''}
${page < pagesCount ? html`<a class="pager" href="/catalog" @click=${event => changePage(event, goTo, page + 1)}>Next &gt;</a>` : ''}
`

const recipeTemplate = (recipe, goTo) => html`
    <article class="preview" @click=${() => goTo('details', recipe._id)}>
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src=${recipe.img}>
        </div>
    </article>`

function changePage(e, goTo, page) {
    e.preventDefault()
    goTo('catalog', page)
}

export function setupCatalog(nav) {
    return showCatalog;

    async function showCatalog(page = 1) {
        const recipes = await getRecipes(page);
        const count = await getRecipeCount();
        const pagesCount = Math.ceil(count / 5);

        return catalogTemplate(recipes, nav.goTo, page, pagesCount);
    }
}



