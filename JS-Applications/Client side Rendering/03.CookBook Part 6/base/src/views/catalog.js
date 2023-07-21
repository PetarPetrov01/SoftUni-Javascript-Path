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
