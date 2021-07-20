// The url to the backend application
const url = "https://mealplanner2.azurewebsites.net/"

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

function getServingOptions(recipe) {
    const optionlist20 = Array.from({ length: 20 }, (x, i) => i + 1);
    var optionString = `
            <select id="selected-number-of-servings" class="number-of-servings-dropdown">
        `
    optionlist20.forEach(number => {
        if (recipe.servings == number) {
            optionString += `
            <option value="${number}" selected>${number}<option>
            `;
        } else {
            optionString += `
            <option value="${number}">${number}</option>
            `
        }
    })

    optionString += `
        </select>
    `
    return optionString
}

function recipeDetailTemplate(recipe) {
    return `
    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-3"><img src="${recipe.picture}" class="recipe-picture"></div>
        <div class="col-sm-5">
            
            <div class="row">
                <div class="col-sm-12 recipe-description">
                    ${recipe.description}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 nutrition-values" id="nutrition-title">
                    Nutrion values per serving
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 nutrition-values-per-serving">
                    Carbs: ${recipe.carbsPerServing.toFixed(2)}
                    <text class="nutrition-values-recipe">|</text>
                    Net Carbs: ${recipe.netCarbsPerServing.toFixed(2)}
                    <text class="nutrition-values-recipe">|</text>
                    Fats: ${recipe.fatsPerServing.toFixed(2)}
                    <text class="nutrition-values-recipe">|</text>
                    Protein: ${recipe.proteinPerServing.toFixed(2)}
                    <text class="nutrition-values-recipe">|</text>
                    Calories: ${recipe.caloriesPerServing.toFixed(2)}
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-10 recipe__servings">
            Number of servings: ${getServingOptions(recipe)}
        </div>
    </div>
`}

function ingredientAndInstructionsTemplate() {
    return `
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
        <div class="col-sm-3 recipe-ingredients" id="ingredient-items"><ul id="ingredient-list-items"></ul></div>
        <div class="col-sm-5 recipe-instructions" id="recipe-instructions"></div>
    </div>
`}

function updateIngredientsNumServings(recipe, selectedNumServings) {
    // selectedNumServings = document.getElementById("selected-number-of-servings").value;
    var recipeIngredients = recipe.recipeIngredients;
    document.getElementById("ingredient-list-items").innerHTML = "";
    recipeIngredients.forEach(recipeIngredient => {
        var ingredient = recipeIngredient.ingredient;

        var ingredientAmountPerServing = recipeIngredient.amount / recipe.servings;
        var ingredientAmountPerSelectedServing = ingredientAmountPerServing * selectedNumServings;

        document.getElementById("ingredient-list-items").innerHTML +=
            `
                <li class="ingredient-name">${ingredientAmountPerSelectedServing} ${recipeIngredient.unit} ${ingredient.name}</li>
        `;
    })
}

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
    if (mealtype != "") {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var recipes = JSON.parse(this.responseText);
                paginatedRecipeEl.recipes = recipes;

            }
        }
        xhr.open("get", url + "findrecipesbymealtype/" + mealtype, true);
        xhr.send();
    } else {
        getAllRecipes();
    }
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
                    <div class="col-sm-8">
                        <h2 class="page-title">${recipe.name}<button class="btn btn-info edit-recipe-btn" onclick="location.href='./editrecipe.html?id=${recipeIdParam}';">Edit Recipe</button></h2>
                    </div>
                </div>

                ${recipeDetailTemplate(recipe)}
                ${ingredientAndInstructionsTemplate()}
            `;

            const selectedNumServings = document.getElementById("selected-number-of-servings");
            selectedNumServings.addEventListener("change", (ev) => {
                updateIngredientsNumServings(recipe, selectedNumServings.value);
            })
            console.log(selectedNumServings.value);
            var recipeIngredients = recipe.recipeIngredients;
            recipeIngredients.forEach(recipeIngredient => {
                var ingredient = recipeIngredient.ingredient;
                var ingredientAmountPerServing = recipeIngredient.amount / recipe.servings;
                var ingredientAmountPerSelectedServing = ingredientAmountPerServing * selectedNumServings.value;
                document.getElementById("ingredient-list-items").innerHTML += `
                        <li class="ingredient-name">${ingredientAmountPerSelectedServing} ${recipeIngredient.unit} ${ingredient.name}</li>
                `;
            })


            var instructionSections = recipe.instructions.split("$");
            if (instructionSections[0] == "") {
                instructionSections.shift();
            }

            instructionSections.forEach(instructionSection => {
                var sectionName = instructionSection.split("#")[0];

                document.getElementById("recipe-instructions").innerHTML += `
                    <div class="row">
                        <div class="col-sm-5 instruction-section" id="instruction-section">${sectionName}</div>
                    </div>
                    <div class="row">
                        <ol id="instruction-steps-${sectionName}"></ol>
                    </div>
                    `;

                var instructionsSteps = instructionSection.split("#");

                if (instructionsSteps[0] == "") {
                    instructionsSteps.shift();
                }
                instructionsSteps.shift();

                instructionsSteps.forEach(instruction => {
                    document.getElementById("instruction-steps-" + sectionName).innerHTML += `
                        <li class="instruction-step-item">${instruction}</li>

                    `;
                })
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
                    <div class="col-sm-8">
                        <h2 class="page-title">${recipe.name}<button class="btn btn-info save-recipe-btn" onclick="saveRecipe()">Save Recipe</button></h2>
                    </div>
                </div>

                ${recipeDetailTemplate(recipe)}
                <div class="row">
                    <br>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-3" id="ingredient-title">Add Ingredients</div>
                    <div class="col-sm-5" id="instruction-title">Instructions</div>
                    <br>
                    <br>
                </div>
                
            `;
            var recipeIngredients = recipe.recipeIngredients;
            recipeIngredients.forEach(recipeIngredient => {
                document.getElementById("added-ingredients").innerHTML += `
                <tr>
                    <td>${recipeIngredient.amount}</td>
                    <td>${recipeIngredient.unit.toLowerCase()}</td>
                    <td>${recipeIngredient.ingredient.name}</td>
                </tr>
                `;
            });

            var instructionSections = recipe.instructions.split("$");
            if (instructionSections[0] == "") {
                instructionSections.shift();
            }

            instructionSections.forEach(instructionSection => {
                var sectionName = instructionSection.split("#")[0];

                document.getElementById("instructions").innerHTML += `
                    <div class="row">
                        <div class="col-sm-5 instruction-section" id="instruction-section">${sectionName}</div>
                    </div>
                    <div class="row">
                        <ol id="instruction-steps-${sectionName}"></ol>
                    </div>
                    `;

                var instructionsSteps = instructionSection.split("#");

                if (instructionsSteps[0] == "") {
                    instructionsSteps.shift();
                }
                instructionsSteps.shift();

                instructionsSteps.forEach(instruction => {
                    document.getElementById("instruction-steps-" + sectionName).innerHTML += `
                        <li class="instruction-step-item">${instruction}</li>

                    `;
                })
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

function unitOptions(ingredientValue) {
    var xhr = new XMLHttpRequest();
    var ingredientId = ingredientValue.split(".")[0];

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            ingredient = JSON.parse(this.responseText);

            let unitString = document.getElementById("ingredient-unit")
            if (ingredient.density != 0 || ingredient.name.includes("WATER") && !ingredient.name.includes("FRESHWATER")) {
                unitString.innerHTML = `
                    <option value="gr">gr</option>
                    <option value="ml">ml</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="cup">cup</option>
        
                `;
            } else {
                unitString.innerHTML = `
                    <option value="gr">gr</option>
                    
                `;
            }
        }
    }
    xhr.open("get", url + "findingredientbyid/" + ingredientId, true);
    xhr.send();
}

async function getAllIngredients() {
    const response = await fetch(url + "allingredients");
    const ingredients = await response.json();
    document.getElementById("table-add-ingredients").innerHTML = `
        <tr>
        <td><input class="input-amount" id="ingredient-amount" type="number" min="0"></td>
            <td>
                <select class="input-unit" id="ingredient-unit">
                </select>
            </td>
            <td>
                <input type="text" list="ingredientList" id="ingredientList-input" class="input-ingredient">
                <datalist id='ingredientList'></datalist>
                <button class="btn btn-info add-ingredient-btn" onclick="addIngredients()">+</button>
            </td>
        <tr>
        `
    const ingredientListEl = document.getElementById('ingredientList');

    let optionsString = '<option value="ADD NEW INGREDIENT TO DATABASE" class="ingredient-list" selected></option>';
    ingredients.forEach(ingredient => {

        optionsString += `
            <option value='${ingredient.id}. ${ingredient.name}' class="ingredient-list" id="ingredient-item" ></option>
        `;
    });

    ingredientListEl.innerHTML = optionsString;

    const selectedIngredient = document.getElementById("ingredientList-input");
    selectedIngredient.addEventListener("change", (ev) => {
        unitOptions(selectedIngredient.value);
    });
}

function addIngredientToDB() {
    var ingredient = {};
    ingredient.name = document.getElementById('ingredient-name-input').value;
    ingredient.calories = document.getElementById('ingredient-calories-input').value;
    ingredient.carbs = document.getElementById('ingredient-carbs-input').value;
    ingredient.netcarbs = document.getElementById('ingredient-netcarbs-input').value;
    ingredient.fats = document.getElementById('ingredient-fats-input').value;
    ingredient.protein = document.getElementById('ingredient-protein-input').value;
    ingredient.density = document.getElementById('ingredient-density-input').value;

    var ingredientJSON = JSON.stringify(ingredient);
    console.log(ingredientJSON);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            location.reload();
        }
    }
    xhr.open("post", url + "addingredienttodb", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(ingredientJSON);
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
                <td>${ingredientName.toLowerCase()}</td>
            </tr>
            `;
        }
    }
    xhr.open("post", url + "addrecipeingredient", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(recipeIngredientJson);
}

function saveRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIdParam = urlParams.get("id");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            window.location.href = "./recipe.html?id=" + recipeIdParam;
        }
    }
    xhr.open("post", url + "finishrecipe/" + recipeIdParam);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}