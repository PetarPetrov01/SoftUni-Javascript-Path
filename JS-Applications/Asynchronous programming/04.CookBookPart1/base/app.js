loadRecipes()
const main = document.querySelector('main')

async function getRecipes() {
    let url = `http://localhost:3030/jsonstore/cookbook/recipes`
    const response = await fetch(url)
    try {
        if (response.ok == false) {
            throw `${response.status} : ${response.statusText}`
        }
        const recipes = await response.json()
        return recipes

    } catch (error) {
        alert(error)
    }
}

async function getRecipeById(id) {
    let url = `http://localhost:3030/jsonstore/cookbook/details/${id}`
    const response = await fetch(url)
    try {
        if (response.ok == false) {
            throw `${response.status} : ${response.statusText}`
        }
        const recipe = await response.json()
        return recipe
        
    } catch (err) {
        alert(err)
    }
}

async function loadRecipes() {
    const recipes = await getRecipes()

    for (let recipe in recipes) {
        console.log(recipes[recipe])
        let newArticle = document.createElement('article')

        newArticle.innerHTML =
            `<div class="title">
        <h2>${recipes[recipe].name}
        </h2>
        </div>
        <div class="small">
        <img src='${recipes[recipe].img}'
        </div>`

        newArticle.classList.add('preview')
        newArticle.id = recipes[recipe]._id
        main.appendChild(newArticle)
    }
}

function loadRecipeCard(recipe) {

    console.log('HERE GPES THE RECIPE')
    let newArticle = document.createElement('article')

    newArticle.innerHTML = `
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb"> 
                <img src="${recipe.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>
                </ul>
            </div>
        </div>
        <div class="description">
            <h3> Preparation
            </h3
        </div>`


    //Append all ingredients
    for (let ingredient of recipe.ingredients) {
        let newLi = document.createElement('li')
        newLi.textContent = ingredient
        newArticle.querySelector('.ingredients ul').appendChild(newLi)
    }

    //Append steps in description
    for (let step of recipe.steps) {
        let newP = document.createElement('p')
        newP.textContent = step
        newArticle.querySelector('.description').appendChild(newP)
    }

    return newArticle
}

//Add cards event listeners
main.addEventListener('click', toggleInfo)

async function toggleInfo(e) {
    let currentId

    if (e.target.tagName == 'ARTICLE') {
        currentId = e.target.id
        e.target.replaceWith(loadRecipeCard(await getRecipeById(currentId)))
    } else if (e.target.tagName == 'H2') {
        let currentTarget = e.target.parentElement.parentElement
        currentId = currentTarget.id
        currentTarget.replaceWith(loadRecipeCard(await getRecipeById(currentId)))
    }


}