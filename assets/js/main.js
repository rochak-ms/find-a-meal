const search = document.getElementById('search');
const submit = document.getElementById('submit');
const recipeEl = document.getElementById('recipes');
const resultHead = document.querySelector('.result-header');
const mealPopup = document.getElementById("recipe-modal");
const mealInfoEl = document.getElementById("re-info");
const popupCloseBtn = document.getElementById("close-popup");

// search recipe
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
          <div class="column is-flex mt-2 is-3-desktop is-4-tablet is-6-mobile">
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
function getRecipeById(recipeID){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const meal = data.meals[0];
    addMealToDom(meal);
  });
}

// add meal to dom
function addMealToDom(meal){
  mealInfoEl.innerHTML = "";

  const mealEl = document.createElement("div");
  mealEl.classList.add("modal-card");

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
        if (meal["strIngredient" + i]) {
            ingredients.push(`${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}`);
        } 
        else {
            break;
        }
    }
    mealEl.innerHTML = `
    <header class="modal-card-head">
      <p class="modal-card-title">${meal.strMeal}</p>
    </header>
    <section class="modal-card-body">
    <p class="image">
    <img class="infoImg"
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"/>
            <h3 class="title is-size-4 mt-5 mb-3">Instruction:</h3>
        <p>${meal.strInstructions}</p>
            <h3 class="title is-size-4 mt-5 mb-3">Ingredients:</h3>
            <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
    </p>
        
        
    </section>`;

    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.add("is-active");
  
}

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.remove("is-active");
});


//  event listeners generate
submit.addEventListener('submit', searchRecipe);

recipeEl.addEventListener('click', e => {
  const recipeInfo = e.path.find(item => {
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
