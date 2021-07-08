// The url to the backend application
const url = "https://mealplanner2.azurewebsites.net/"

// Add an eventlistener to the name input field, to search on enter press
const nameInput = document.getElementById('search-recipe-by-name');
if (nameInput != null) {
    nameInput.addEventListener("keyup", function (event) {
        findRecipesByName();
    });
}

// Add an eventlistener to the ingredient input field, to search on enter press
const ingredientInput = document.getElementById('search-recipe-by-ingredient');
if (ingredientInput != null) {
    ingredientInput.addEventListener("keyup", function (event) {
        findRecipesByIngredient();
    });
}

function getAllRecipes() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(this.responseText);
            var recipes = JSON.parse(this.responseText);
            document.getElementById("recipe-result").innerHTML = "";
            recipes.forEach(recipe => {
                document.getElementById("recipe-result").innerHTML += `
                <br>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3"><img src="${recipe.picture}" class="recipe-picture"></div>
                    <div class="col-sm-7">
                        <div class="row">
                            <div class="col-sm-8 recipe__name">
                                <h4 class="recipe-title"><a href="./recipe.html?id=${recipe.id}">${recipe.name}</a></h4>
                            </div>                            
                        </div>

                        <div class="row">
                            <div class="col-sm-8 recipe__description">
                                ${recipe.description}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            })
        }
    }
    xhr.open("get", url + "allrecipes", true);
    xhr.send();
}

function findRecipesByName(recipeName = "") {
    if (isEmptyOrSpaces(recipeName)) {
        getAllRecipes();
    } else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(this.responseText);
                var recipes = JSON.parse(this.responseText);
                document.getElementById("recipe-result").innerHTML = "";
                recipes.forEach(recipe => {
                    document.getElementById("recipe-result").innerHTML += `
                    <br>
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-3"><img src="${recipe.picture}" class="recipe-picture"></div>
                        <div class="col-sm-7">
                            <div class="row">
                                <div class="col-sm-8 recipe__name">
                                    <h4 class="recipe-title"><a href="./recipe.html?id=${recipe.id}">${recipe.name}</a></h4>
                                </div>                            
                            </div>

                            <div class="row">
                                <div class="col-sm-8 recipe__description">
                                    ${recipe.description}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                })
            };
        }
        xhr.open("get", url + "findrecipesbyname/" + recipeName, true);
        xhr.send();
    }
}

function findRecipesByIngredient() {
    var ingredientName = document.getElementById("search-recipe-by-ingredient").value;
    console.log(ingredientName);
    if (isEmptyOrSpaces(ingredientName)) {
        getAllRecipes();
    } else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(this.responseText);
                var recipes = JSON.parse(this.responseText);
                document.getElementById("recipe-result").innerHTML = "";
                recipes.forEach(recipe => {
                    document.getElementById("recipe-result").innerHTML += `<br>
                        <div class="row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-2"><img src="${recipe.picture}" class="recipe-picture"></div>
                            
                            <div class="col-sm-8">
                                
                                <div class="row">
                                    <div class="col-sm-8 recipe__name">
                                        <h4 class="recipe-title"><a href="./recipe.html?id=${recipe.id}">${recipe.name}</a></h4>
                                    </div>                            
                                 </div>
                        
                                <div class="row">
                                     <div class="col-sm-8 recipe__description">
                                        ${recipe.description}
                                    </div>
                                </div>
                             </div>
                        </div>
                    `;
                })
            }
        }
        xhr.open("get", url + "findrecipesbyingredient/" + ingredientName, true);
        xhr.send();
    }
}

function getRecipeDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIdParam = urlParams.get("id");
    console.log(recipeIdParam);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(this.responseText);
            var recipe = JSON.parse(this.responseText);
            document.getElementById("recipe-title-top").innerHTML = recipe.name;
            document.getElementById("recipe-detail").innerHTML += `
                <br>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-6">
                        <h2 class="page-title">${recipe.name}</h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3"><img src="${recipe.picture}" class="recipe-picture"></div>
                    <div class="col-sm-7">
                        
                        <div class="row">
                            <div class="col-sm-8 recipe__description">
                                ${recipe.description}
                            </div>
                        </div>

                        <div class="row">
                            <br>
                            <div class="col-sm-8 recipe__servings">
                                Number of servings: ${recipe.servings}
                            </div>
                        </div>

                    </div>
                </div>
        
                <div class="row">
                    <br>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-10">Ingredients</div>
                    <br>
                    <br>
                </div>
            `;
            var recipeIngredients = recipe.recipeIngredients;
            recipeIngredients.forEach(recipeIngredient => {
                var ingredient = recipeIngredient.ingredient;
                console.log(ingredient.name)
                //document.getElementById("ingredients")
                document.getElementById("ingredients-list").innerHTML +=
                    `
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-4 recipe__ingredients">
                            <ul>
                                <li class="ingredient-name">${recipeIngredient.amount} ${recipeIngredient.unitPrefix} ${ingredient.name}</li>
                            </ul>
                        </div>
                    </div>
                `;
            })
        }
    }
    xhr.open("get", url + "findrecipebyid/" + recipeIdParam, true);
    xhr.send();
}

function addRecipe() {
    var recipe = {};
    recipe.name = document.getElementById('recipe-name-input').value;
    recipe.servings = document.getElementById('servings-input').value;
    recipe.description = document.getElementById('recipe-description-input').value;
    recipe.picture = document.getElementById('recipe-picture-url-input').value;
    recipe.recipeIngredients = [];

    var recipejson = JSON.stringify(recipe);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var newRecipe = JSON.parse(this.responseText);
            console.log(this.responseText);
            addIngredients(newRecipe);
        }
    }
    xhr.open("post", url + "addrecipe", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(recipejson);
}

function addIngredients(newRecipe) {
    document.getElementById('new-recipe').innerHTML = `
        <br>
        <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-6">
                <h2 class="page-title">${newRecipe.name}</h2>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-2"><img src="${newRecipe.picture}" class="recipe-picture"></div>
            <div class="col-sm-8">
                
                <div class="row">
                    <div class="col-sm-8 recipe__description">
                        ${newRecipe.description}
                    </div>
                </div>

                <div class="row">
                    <br>
                    <div class="col-sm-8 recipe__servings">
                        Number of servings: ${newRecipe.servings}
                    </div>
                </div>

            </div>
        </div>
        
        <div class="row">
            <br>
            <div class="col-sm-2"></div>
            <div class="col-sm-10">Ingredients</div>
            <br>
            <br>
        </div>
    `;
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}