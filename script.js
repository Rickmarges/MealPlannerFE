// The url to the backend application
const url = "http://localhost:8082/"

// insert custom elements paginated recipes
const recipeResultEl = document.getElementById("recipe-result");
const paginatedRecipeEl = document.createElement('paginated-recipes');
paginatedRecipeEl.size = 10;
recipeResultEl.appendChild(paginatedRecipeEl);

// Add an eventlistener to the name input field, to search on enter press
const nameInput = document.getElementById('search-recipe-by-name');
if (nameInput != null) {
    nameInput.addEventListener("keyup", function (event) {
        findRecipesByName(event.target.value);
    });
}

const nameInputButton = document.getElementById("search-recipe-by-name-btn");
if (nameInputButton && nameInput) {
    nameInputButton.addEventListener('click', (ev) => {
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

const recipeTemplate = (recipe) => `
    <div class="recipe">
        <div><img src="${recipe.picture}"></div>
        <div class="recipe__content">
            <h4 class="recipe__title"><a href="./recipe.html?id=${recipe.id}">${recipe.name}</a></h4>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </div>
    </div>
`;

const recipeDetailTemplate = (recipe) => `
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
`;

function getAllRecipes() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var recipes = JSON.parse(this.responseText);
            paginatedRecipeEl.recipes = recipes;
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
                var recipes = JSON.parse(this.responseText);
                paginatedRecipeEl.recipes = recipes;

            }
        }
        xhr.open("get", url + "findrecipesbyname/" + recipeName, true);
        xhr.send();
    }
}

function findRecipesByIngredient(ingredientName = "") {
    var ingredientName = document.getElementById("search-recipe-by-ingredient").value;
    if (isEmptyOrSpaces(ingredientName)) {
        getAllRecipes();
    } else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var recipes = JSON.parse(this.responseText);
                paginatedRecipeEl.recipes = recipes;

            }
        }
        xhr.open("get", url + "findrecipesbyingredient/" + ingredientName, true);
        xhr.send();
    }
}

function findRecipesByMealType() {
    var mealtype = document.getElementById("search-recipe-by-mealtype").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var recipes = JSON.parse(this.responseText);
            paginatedRecipeEl.recipes = recipes;

        }
    }
    xhr.open("get", url + "findrecipesbymealtype/" + mealtype, true);
    xhr.send();
}


function getRecipeDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIdParam = urlParams.get("id");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
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

                ${recipeDetailTemplate(recipe)}
        
                <div class="row">
                    <br>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3" id="ingredient-title">Ingredients</div>
                    <div class="col-sm-5" id="instruction-title">Instructions</div>
                    <br>
                    <br>
                    </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3 recipe__ingredients" id="ingredient-items"></div>
                    <div class="col-sm-5 recipe_instructions" id="recipe-instructions">
                        <div class="row">
                            <ol id="instruction-steps"></ol>
                        </div>
                    </div>
                </div>

            `;
            var recipeIngredients = recipe.recipeIngredients;
            recipeIngredients.forEach(recipeIngredient => {
                var ingredient = recipeIngredient.ingredient;
                document.getElementById("ingredient-items").innerHTML +=
                    `
                            <ul>
                                <li class="ingredient-name">${recipeIngredient.amount} ${recipeIngredient.unit} ${ingredient.name}</li>
                            </ul>
                `;
            })
            var instructions = recipe.instructions.split("#");

            if (instructions[0] == "") {
                instructions.shift();
            }
            document.getElementById("instruction-steps").innerHTML += ""
            instructions.forEach(instruction => {
                document.getElementById("instruction-steps").innerHTML += `
                    
                            <li class="instruction-step-item">${instruction}</li>

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

                ${recipeDetailTemplate(recipe)}
                <div class="row">
                    <br>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3">Add Ingredients</div>
                    <div class="col-sm-5">Instructions</div>
                    <br>
                    <br>
                </div>
                
            `;
            document.getElementById("instructions").innerHTML = `
            <div class="row">
                    <div class="col-sm-12 recipe_instructions" id="recipe-instructions">
                        <div class="row">
                            <ol id="instruction-steps"></ol>
                        </div>
                    </div>
                </div>
            `;
            var instructions = recipe.instructions.split("#");

            if (instructions[0] == "") {
                instructions.shift();
            }
            document.getElementById("instruction-steps").innerHTML += ""
            instructions.forEach(instruction => {
                document.getElementById("instruction-steps").innerHTML += `
                    
                            <li class="instruction-step-item">${instruction}</li>

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
            window.location.href = "./editrecipe.html?id=" + newRecipe.id;
            getRecipeDetailForEdit(newRecipe);
        }
    }
    xhr.open("post", url + "addrecipe", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(recipeJson);

}


async function getAllIngredients() {
    const response = await fetch(url + "allingredients");
    const ingredients = await response.json();
    document.getElementById("table-add-ingredients").innerHTML = ``

}

function addIngredientToDB() {
    var ingredient = {};
    ingredient.id = 10;
    ingredient.name = document.getElementById('ingredient-name-input').value;
    ingredient.calories = document.getElementById('ingredient-calories-input').value;
    ingredient.carbs = document.getElementById('ingredient-carbs-input').value;
    ingredient.netcarbs = document.getElementById('ingredient-netcarbs-input').value;
    ingredient.fats = document.getElementById('ingredient-fats-input').value;
    ingredient.protein = document.getElementById('ingredient-protein-input').value;
    ingredient.density = document.getElementById('ingredient-density-input').value;

    var ingredientJSON = JSON.stringify(ingredient);
    console.log(ingredientJSON);

    //todo
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            /* document.getElementById("added-ingredients").innerHTML += `
            <tr>
                <td>${recipeIngredient.amount}</td>
                <td>${recipeIngredient.unit.toLowerCase()}</td>
                <td>${ingredientName}</td>
            </tr>
            `;-->*/
            location.reload();
        }
    }
    xhr.open("post", url + "addingredienttodb", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(ingredientJSON);
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
            <td><input class="input-amount" id="ingredient-amount" type="number" min="0"></td>
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

            const ingredientListEl = document.getElementById('ingredientList');

            let optionsString = '<option value="ADD NEW INGREDIENT TO DATABASE"></option>';
            ingredients.forEach(ingredient => {
                optionsString += `
            <option value='${ingredient.id}. ${ingredient.name}' class="ingredient-list"></option>
        `;
            })

            ingredientListEl.innerHTML = optionsString;
        }
    }
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

    var recipeIngredientJson = JSON.stringify(recipeIngredient);
    var xhr = new XMLHttpRequest();
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