// The url to the backend application
const url = "http://localhost:8082/"

// Add an eventlistener to the name input field, to search on enter press
const nameInput = document.getElementById('search-recipe-by-name');
if (nameInput != null) {
    nameInput.addEventListener("keyup", function (event) {
        findRecipesByName(nameInput.value);
    });
}

// Add an eventlistener to the ingredient input field, to search on enter press
const ingredientInput = document.getElementById('search-recipe-by-ingredient');
if (ingredientInput != null) {
    ingredientInput.addEventListener("keyup", function (event) {
        findRecipesByIngredient(ingredientInput.value);
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
    console.log(recipeName);
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
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3 recipe__ingredients" id="ingredient-items"></div>
                    <div class="col-sm-3 recipe_instructions" id="recipe-instructions">${recipe.instructions}</div>
                    </div>

            `;
            var recipeIngredients = recipe.recipeIngredients;
            recipeIngredients.forEach(recipeIngredient => {
                var ingredient = recipeIngredient.ingredient;
                console.log(ingredient.name)
                //document.getElementById("ingredients")
                document.getElementById("ingredient-items").innerHTML +=
                    `
                            <ul>
                                <li class="ingredient-name">${recipeIngredient.amount} ${recipeIngredient.unit} ${ingredient.name}</li>
                            </ul>
                `;
            })
        }
    }
    xhr.open("get", url + "findrecipebyid/" + recipeIdParam, true);
    xhr.send();
}

function getRecipeDetailForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIdParam = urlParams.get("id");

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
                <div class="col-sm-2"></div>
                <div class="col-sm-3 recipe_instructions" id="recipe-instructions">${recipe.instructions}</div>
            </div>
                <div class="row">
                    <br>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-10">Add Ingredients</div>
                    <br>
                    <br>
                </div>
                
            `;
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
    recipe.instructions = document.getElementById('recipe-instructions-input').value;
    recipe.breakfast = document.getElementById('recipe-mealtype-input-breakfast').checked;
    recipe.lunch = document.getElementById('recipe-mealtype-input-lunch').checked;
    recipe.dinner = document.getElementById('recipe-mealtype-input-dinner').checked;
    recipe.picture = document.getElementById('recipe-picture-url-input').value;
    recipe.recipeIngredients = [];

    var recipeJson = JSON.stringify(recipe);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var newRecipe = JSON.parse(this.responseText);
            console.log(this.responseText);
            window.location.href = "./editrecipe.html?id=" + newRecipe.id;
            getRecipeDetailForEdit(newRecipe);
        }
    }
    xhr.open("post", url + "addrecipe", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(recipeJson);

}

function getAllIngredients(newRecipe) {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIdParam = urlParams.get("id");
    console.log(recipeIdParam);
    // window.location.href = "./editrecipe.html?id=" + newRecipe.id;
    var xhr = new XMLHttpRequest();
    console.log("in get ingredient")
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var ingredients = JSON.parse(this.responseText);
            document.getElementById("table-add-ingredients").innerHTML = `
            <tr>
            <td><input class="input-amount" id="ingredient-amount" type="number"></td>
                <td><select class="input-unit" id="ingredient-unit">
                        <option value="gr">gr</option>
                        <option value="ml">ml</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="cup">cup</option>
                    </select></td>
                <td><input type="text" list="ingredientList" id="ingredientList-input" class="input-ingredient">
                    <datalist id='ingredientList'></datalist>
                    <button class="btn btn-info add-ingredient-btn" onclick="addIngredients()">+</button>
                </td>
            <tr>
            `
            document.getElementById("ingredientList").innerHTML = `
                <option value="ADD NEW INGREDIENT TO DATABASE"></option>
            `;
            ingredients.forEach(ingredient => {
                document.getElementById("ingredientList").innerHTML += `
                    <option value='${ingredient.id}. ${ingredient.name}' class="ingredient-list"></option>
                `;
            })
        }
    }
    xhr.open("get", url + "allingredients", true);
    xhr.send();
}

function addIngredients() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIdParam = urlParams.get("id");
    recipeIngredient = {}
    recipeIngredient.amount = parseInt(document.getElementById("ingredient-amount").value);
    recipeIngredient.unit = document.getElementById("ingredient-unit").value;
    recipeIngredient.recipe = {};
    recipeIngredient.recipe.id = parseInt(recipeIdParam);
    ingredient = document.getElementById("ingredientList-input").value;
    ingredientId = ingredient.split(".")[0];
    ingredientName = ingredient.split(". ")[1];
    recipeIngredient.ingredient = {};
    recipeIngredient.ingredient.id = parseInt(ingredientId);
    console.log(recipeIngredient);

    var recipeIngredientJson = JSON.stringify(recipeIngredient);
    console.log(recipeIngredientJson);
    var xhr = new XMLHttpRequest();
    console.log("in add ingredient");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            document.getElementById("added-ingredients").innerHTML += `
            <tr>
                <td>${recipeIngredient.amount}</td>
                <td>${recipeIngredient.unit.toLowerCase()}</td>
                <td>${ingredientName}</td>
            </tr>
            `;
        }
    }
    xhr.open("post", url + "addrecipeingredient", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(recipeIngredientJson);
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}