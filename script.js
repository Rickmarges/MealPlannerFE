// The url to the backend application
const url = "https://mealplanner2.azurewebsites.net/"

// Add an eventlistener to the name input field, to search on enter press
const nameInput = document.getElementById('search-recipe-by-name');
if (nameInput != null) {
    nameInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            findRecipesByName();
        }
    });
}

// Add an eventlistener to the ingredient input field, to search on enter press
const ingredientInput = document.getElementById('search-recipe-by-ingredient');
if (ingredientInput != null) {
    ingredientInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            findRecipesByIngredient();
        }
    });
}

function getAllRecipes() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(this.responseText);
            var recipes = JSON.parse(this.responseText);
            recipes.forEach(recipe => {
                document.getElementById("recipe-result").innerHTML += `
                <br>
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
    xhr.open("get", url + "allrecipes", true);
    xhr.send();
}

function findRecipesByName() {
    var recipeName = document.getElementById("search-recipe-by-name").value;
    console.log(recipeName);
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
        };
    }
    xhr.open("get", url + "findrecipesbyname/" + recipeName, true);
    xhr.send();

}

function findRecipesByIngredient() {
    var ingredientName = document.getElementById("search-recipe-by-ingredient").value;
    console.log(ingredientName);
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
                    <div class="col-sm-2"><img src="${recipe.picture}" class="recipe-picture"></div>
                    <div class="col-sm-8">
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
                        <br>
                        <div class="row>
                            
                            <div class="col-sm-2 ingredients-header>Ingredients</div>
                        </div>
                        <div class="row">
                            <br>
                            <div class="col-sm-2 recipe__ingredient">
                                <ul>
                                    <li class="ingredient-name">${recipe.ingredient.name}</li>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    xhr.open("get", url + "findrecipebyid/" + recipeIdParam, true);
    xhr.send();

}

function addRecipe() {
    var b = {};

    var a = {
        "name": "Keto chicken casserole",
        "servings": 6,
        "description": "Keto and casseroles go hand in hand, especially when it comes to this irresistible chicken recipe that will make your entire family swoon. The cream sauce is hearty, cheesy, and loaded with yummy pesto. Your oven will feel honored to bake this tasty goodness for you over and over again.",
        "instructions": "1. Preheat the oven to 400°F (200°C). 2. Mix cream and cream cheese with pesto and lemon juice. Salt and pepper to taste. 3. In a large pan over medium-high heat, melt the butter. Add the chicken, season with salt and pepper, and fry until they turn a nice golden brown. 4. Place the chicken in a greased 9 x 13 inch(23 x 33 cm) baking dish, and pour in the cream mixture.5. Top chicken with leek, tomatoes, and cauliflower.6. Sprinkle cheese on top and bake in the middle of the oven for at least 30 minutes or until the chicken is fully cooke. If the casserole is at risk of burning before it's done, cover it with a piece of aluminium foil, lower the heat and let cook for a little longer.",
        "favorite": false,
        "mealTypes": ["Breakfast", "Lunch"],
        "nutritionValuesPerServing": { //This Part is required and can't be left "unsend"
            "netCarbs": 7.0,
            "carbs": 9.0,
            "fats": 46.0,
            "protein": 43.0,
            "calories": 617.0
        }
    };
    b.name = "Gebakken eitje";
    b.servings = 6;
    b.description = "Lekker ontbijt";
    b.instructions = "1. Breek het ei in de pan. 2. Bak het ei. 3. Eet het ei.";
    b.favorite = false;
    b.mealTypes = ["Breakfast"]
    b.nutritionValuesPerServing = {}
    b.nutritionValuesPerServing.netCarbs = 1.0;
    b.nutritionValuesPerServing.carbs = 1.5;
    b.nutritionValuesPerServing.fats = 30.0;
    b.nutritionValuesPerServing.protein = 60.0;
    b.nutritionValuesPerServing.calories = 250.0;
    var dejson = JSON.stringify(b);
    console.log(dejson);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(this.responseText);

    }
    xhr.open("post", url + "addrecipe", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dejson);
}
