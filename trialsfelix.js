var baseUrl = "http://localhost:8082";
function toonAlleMealPlans(){
    getRequest(printAllMealPlans, "allmealplans");
}
function getRequest(callback, url){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
//                console.log(this.responseText);
        if(this.readyState == 4){
            var result = JSON.parse(this.responseText);
            callback(result);
        }
    }
	console.log("Ik roep nu aan: ",baseUrl+"/"+url)
    xhr.open("get", baseUrl+"/"+url, true);
    xhr.send();
}
function printAllMealPlans(mealPlans){
    gebi("toonMealplans").innerHTML ="";
    console.log(mealPlans);
    mealPlans.forEach(element => gebi("toonMealplans").innerHTML += "<br>"+element.start + htmlDetailButton(element.id));
}
function htmlDetailButton(id){
    return `<button onclick=gaNaarDetailsMealPlan(${id})> Details </button>`;
}
function maakMealPlanAan(){
    var mealPlan = {};
    mealPlan.start = gebi("startdate").value;
    mealPlan.end = gebi("enddate").value;
    mealPlanJSON = JSON.stringify(mealPlan);
    postObject(mealPlanJSON, "addmealplan");
}
function postObject(objJSON, url){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(this.responseText);
    }
    xhr.open("post", baseUrl+"/"+url, true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(objJSON);            
}
function gebi(id){
    return document.getElementById(id);
}
function gaNaarDetailsMealPlan(id){
    window.location = "mealplan.html?id="+id

}