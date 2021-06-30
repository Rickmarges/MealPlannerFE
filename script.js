
function getRecipesByName() {
    var recipeName = document.getElementById("search-recipe").value;
    console.log(recipeName);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(this.responseText);
        var recipes = JSON.parse(this.responseText);
        recipes.forEach(element => document.getElementById("recipe-name").innerHTML = element.name);
        recipes.forEach(element => document.getElementById("servings").innerHTML = element.servings);
        recipes.forEach(element => document.getElementById("description").innerHTML = element.description);
    }
    xhr.open("get", "http://localhost:8082/found-recipes/" + recipeName, true);
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
        },
    };
    // a.instructions = "daan";
    var dejson = JSON.stringify(a);
    console.log(dejson);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(this.responseText);

    }
    xhr.open("post", "http://localhost:8082/addrecipe", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dejson);
}
