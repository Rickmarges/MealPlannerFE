var baseUrl = "http://localhost:8082";
function toonAlleMealPlans() {
    getRequest(printAllMealPlans, "allmealplans");
}
function getRequest(callback, url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        //                console.log(this.responseText);
        if (this.readyState == 4) {
            var result = JSON.parse(this.responseText);
            callback(result);
        }
    }
    console.log("Ik roep nu aan: ", baseUrl + "/" + url)
    xhr.open("get", baseUrl + "/" + url, true);
    xhr.send();
}
function printAllMealPlans(mealPlans) {
    gebi("toonMealplans").innerHTML = "";
    console.log(mealPlans);
    mealPlans.forEach(element => gebi("toonMealplans").innerHTML += "<br>" + element.start + htmlDetailButton(element));
}
function htmlDetailButton(mealPlan) {
    return `<button onclick=gaNaarDetailsMealPlan(${mealPlan.id})> Details </button>`;
}
function maakMealPlanAan() {
    var mealPlan = {};
    mealPlan.start = gebi("startdate").value;
    mealPlan.end = gebi("enddate").value;
    mealPlanJSON = JSON.stringify(mealPlan);
    postObject(mealPlanJSON, "addmealplan");
}
function postObject(objJSON, url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(this.responseText);
		var responseAsJson = JSON.parse(this.responseText);
		gaNaarDetailsMealPlan(responseAsJson.id)
    }
    xhr.open("post", baseUrl + "/" + url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(objJSON);
}
function gebi(id) {
    return document.getElementById(id);
}
function gaNaarDetailsMealPlan(mealPlanId) {
    console.log(mealPlanId);
    window.location = "./mealplan.html?id=" + mealPlanId

}
function addRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("mealid");
    const mealDate = urlParams.get("date");
    const mealType = urlParams.get("mealtype");
    const mealPlanId = urlParams.get("mealplanid");
    console.log("mealid: " + mealId);
    console.log("mealplan id: " + mealPlanId);
    console.log("meal date: " + mealDate);
    console.log("mealtype: " + mealType);
    getAllRecipesForMeal(mealType)

    document.getElementById("meal-date").innerHTML = mealDate;
    document.getElementById("meal-meal-type").innerHTML = mealType;



}

async function getAllRecipesForMeal(mealType) {
    const response = await fetch(baseUrl + "/findrecipesbymealtype/" + mealType);
    const recipes = await response.json();

    document.getElementById("table-add-recipe").innerHTML = `
    <tr>
        <td>
            <input class="input-amount" id="servings-amount" type="number" min="0"></input>
        </td>
        <td>
            <input type="text" list="recipelist" name="recipe" id="recipe-list-for-meal"></input>
            <datalist id="recipelist"></datalist>
        </td>
        <td>
            <button class="btn btn-info">add recipe</button>
        </td>
        <td>
            <button class="btn btn-info">save</button>
        </td>
        <td>
            <button class="btn btn-info">cancel</button>
        </td>
    `

    let optionsString = "";
    recipes.forEach(recipe => {
        optionsString += `<option value="${recipe.name}"></option>`;
    }
    )
    gebi("recipelist").innerHTML = optionsString;
}