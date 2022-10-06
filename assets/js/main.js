const search = document.getElementById('search');
const submit = document.getElementById('submit');
const recipeEl = document.getElementById('recipes');
const resultHead = document.querySelector('.result-header');
const mealPopup = document.getElementById("modal");
const popupCloseBtn = document.getElementById("close-popup");


function searchRecipe(e){
    e.preventDefault();

    // get search recipe
    const term = search.value;

    // check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((res) => res.json())
            .then((data) => {
                resultHead.innerHTML = `<h2 class="is-size-1 is-size-2-mobile">Search Result for ${term}</h2>`;
                if(data.meals === null){
                    resultHead.innerHTML = `<h2 class="has-danger-danger-dark is-size-1 is-size-2-mobile">There Are No Result for ${term}</h2>`;
                }else{

                    recipeEl.innerHTML = data.meals.map(
                        rec => `
          <div class="column is-flex is-justify-content-center is-align-item-center mt-2 is-3-desktop is-4-tablet is-6-mobile">
            <div class="card rec-card">
              <div class="card-image is-size-2 has-text-centered">
                <img src="${rec.strMealThumb}" alt="${rec.strMeal}">
              </div>
             <div class="card-content recipe-info" data-recipeID="${rec.idMeal}">
                <p class="title is-size-3 has-text-white">${rec.strMeal}</p>
              </div>
            </div>
          </div>`
                    )
                        .join('');
                }

            });

    }
}

// fetch meal by id
function getRecipeById(recipeId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const response = data.meals[0];
            addMealToDom(response);
        });
}



//Creates blank object to store nutrition data
let index = 0;
let nutritionAmounts = {
  KCALS: 0,
  FATS: 0,
  CARBS: 0,
  SUGARS: 0,
  PROTIEN: 0
};

function createIngredientJSON(arr) {
  let ingredientList = [];
  arr.forEach(obj => {
    // will give us a list of ingredients to use in object post
    if (obj.ingredient && obj.measure) {
      ingredientList.push(obj.measure + " " + obj.ingredient);
    }
  })
  // call postCall at some point
  let ingredientObject = JSON.stringify({"title":"chicken", "ingr":ingredientList});



  postCall(ingredientObject);
  // setTimeout(() => { setDOM() }, 3000);
}

// send post request to nutrition api
let postCall = (data) => {
  let apiInfo = {
    KEY: "9731b96be1ad481a80d0c1a119dea87b",
    ID: "ef917726"
  }
  let url = 'https://api.edamam.com/api/nutrition-details?app_id=' +
      apiInfo.ID + '&app_key=' +
      apiInfo.KEY;
  $.ajax({
    url: url,
    type: 'POST',
    contentType: "application/json",
    data: data,
  })
      .done(res => {
        setNutrientObj(res);
      })
      .fail(err => {
        console.log(err);
        setDOM();

        console.log(postCall());
      });
}

let setNutrientObj = (obj) => {
  // set variables to data or if unavailable
  let totalKcals = obj.totalNutrients.ENERC_KCAL.quantity === undefined ? 0 : obj.totalNutrients.ENERC_KCAL.quantity;
  let fats = obj.totalNutrients.FAT.quantity === undefined ? 0 : obj.totalNutrients.FAT.quantity;
  let carbs = obj.totalNutrients.CHOCDF.quantity === undefined ? 0 : obj.totalNutrients.CHOCDF.quantity;
  let sugar = obj.totalNutrients.SUGAR.quantity === undefined ? 0 : obj.totalNutrients.SUGAR.quantity;
  let protien = obj.totalNutrients.PROCNT.quantity === undefined ? 0 : obj.totalNutrients.PROCNT.quantity;

  // // add the nutrients to object for each ingredient
  nutritionAmounts.KCALS = Math.round(totalKcals);
  nutritionAmounts.FATS = Math.round(fats);
  nutritionAmounts.CARBS = Math.round(carbs);
  nutritionAmounts.SUGARS = Math.round(sugar);
  nutritionAmounts.PROTIEN = Math.round(protien);

  setDOM();
};

let setDOM = () => {
  // set stuff in object to html here
  if (nutritionAmounts.KCALS === 0) {
    // call failed
    $('#calories-display').text("Calories: " + "Unavailable");
    $('#fat-display').text("Fat: " + "Unavailable");
    $('#carb-display').text("Carbs: " +  "Unavailable");
    $('#protien-display').text("Protien: " + "Unavailable");
    $('#sugar-display').text("Sugar: " + "Unavailable");
  } else {
    // if call succeeded
    $('#calories-display').text(nutritionAmounts.KCALS);
    $('#fat-display').text(nutritionAmounts.FATS + 'g');
    $('#carb-display').text(nutritionAmounts.CARBS + 'g');
    $('#protien-display').text(nutritionAmounts.PROTIEN + 'g');
    $('#sugar-display').text(nutritionAmounts.SUGARS + 'g');
  }
}

// function to split serving when number added to input
let splitServing = () => {
    let amountPeople = $('#amount-servings').val();
    if(amountPeople(val > 0 )){
    for (const property in nutritionAmounts) {
        nutritionAmounts[property] /= amountPeople;
    }} else{
        return false;
    }
    setDOM();
};

$('#split').on('click', splitServing);
// add meal to dom
function addMealToDom(response){
    $("#recipe-name").text(response.strMeal);
    $("#id").attr("data-id", response.idMeal);
    $("#instructions").text(response.strInstructions);
    $("#recipe-img").attr("src", response.strMealThumb);
    $("#recipe-img").attr("alt", response.strMeal);

    $("#ingredients").empty();

    let ingredients = 
    [{
        ingredient: response.strIngredient1,
        measure: response.strMeasure1
    },{
        ingredient: response.strIngredient2,
        measure: response.strMeasure2
    },{
        ingredient: response.strIngredient3,
        measure: response.strMeasure3
    },{
        ingredient: response.strIngredient4,
        measure: response.strMeasure4
    },{
        ingredient: response.strIngredient5,
        measure: response.strMeasure5
    },{
        ingredient: response.strIngredient6,
        measure: response.strMeasure6
    },{
        ingredient: response.strIngredient7,
        measure: response.strMeasure7
    },{
        ingredient: response.strIngredient8,
        measure: response.strMeasure8
    },{
        ingredient: response.strIngredient9,
        measure: response.strMeasure9
    },{
        ingredient: response.strIngredient10,
        measure: response.strMeasure10
    },{
        ingredient: response.strIngredient11,
        measure: response.strMeasure11
    },{
        ingredient: response.strIngredient12,
        measure: response.strMeasure12
    },{
        ingredient: response.strIngredient13,
        measure: response.strMeasure13
    },{
        ingredient: response.strIngredient14,
        measure: response.strMeasure14
    },{
        ingredient: response.strIngredient15,
        measure: response.strMeasure15
    },{
        ingredient: response.strIngredient16,
        measure: response.strMeasure16
    },{
        ingredient: response.strIngredient17,
        measure: response.strMeasure17
    },{
        ingredient: response.strIngredient18,
        measure: response.strMeasure18
    },{
        ingredient: response.strIngredient19,
        measure: response.strMeasure19
    },{
        ingredient: response.strIngredient20,
        measure: response.strMeasure20
    }]



    for(let i=0; i<ingredients.length; i++){
        if(ingredients[i].ingredient)
        {
            let liEL = $("<li>").text(ingredients[i].measure + " : " + ingredients[i].ingredient);
            $("#ingredients").append(liEL);
        }}
// call nutrition functions
    newFunction();

    function newFunction() {
        createIngredientJSON(ingredients);
    }
    
    mealPopup.classList.add("is-active");
       
  
}
popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.remove("is-active");
});

//  event listeners generate
submit.addEventListener('submit', searchRecipe);

recipeEl.addEventListener('click', recipeID => {
        const recipeInfo = recipeID.path.find(item => {
            if(item.classList){
                return item.classList.contains('recipe-info');
            }else{
                return false;
            }
        });
        if(recipeInfo){
            const recipeID = recipeInfo.getAttribute('data-recipeID');
            getRecipeById(recipeID);
        }
    }
);
