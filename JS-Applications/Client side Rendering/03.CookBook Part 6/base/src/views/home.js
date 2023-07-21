const homeTemplate = (recents, goTo) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Cookbook</h2>
    </div>
    <header class="section-title">Recently added recipes</header>
    <div class="recent-recipes">
     ${recents[0] ? recentRecipe(recents[0], goTo) : ''}   
     ${spacerTemplate()}   
     ${recents[1] ? recentRecipe(recents[1], goTo) : ''}   
     ${spacerTemplate()}   
     ${recents[2] ? recentRecipe(recents[2], goTo) : ''}   
    </div>
    <footer class="section-title">
        <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
    </footer>
</section>
`;

const recentRecipe = (recipe, goTo) => html`
<article class="recent" @click=${() => goTo('details', recipe._id)}>
    <div class="recent-preview"><img src=${recipe.img}></div>
    <div class="recent-title">${recipe.name}</div>
</article>
`;

const spacerTemplate = () => html`
<div class="recent-space"></div>`
