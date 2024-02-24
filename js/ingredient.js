let inputFormEL = document.querySelector("form");
let inputEL = document.querySelector("input");
let mealContainerEL = document.querySelector(".ingredients-container");
let detailModal = document.querySelector(".detail-modal");
let closeBtn = document.querySelector(".close");
let modalContent = document.querySelector(".meal-container");

let API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const fetchRecipe = async (e) => {
  e.preventDefault();

  // 1. Show Search GIF
  let searchGifHTML = `
  <div class="help">
  <img src="../images/search.gif" />
  <h1>Searching Your Recipe........</h1>
  </div>
  `;

  mealContainerEL.innerHTML = searchGifHTML;

  //2. Call Api
  let response = await fetch(API_URL + inputEL.value);
  let data = await response.json();

  console.log(data.meals);
  //3. Check data
  if (data.meals) {
    mealContainerEL.innerHTML = "";

    data.meals.map((meal) => {
      let html = `
        <div class="card">
        <img
          src=${meal.strMealThumb}
          alt="Text"
        />
        <h1>${meal.strMeal}</h1>
        <button class = "detail-btn" id = ${meal.idMeal}>Show Details</button>
        
      </div>
        `;

      mealContainerEL.insertAdjacentHTML("beforeend", html);
    });
  } else {
    let sorryGifHTML = `
    <div class="help">
      <img src="../images/sorry.gif" />
      <h2>We are unable to find anything for you.......</h2>
      </div>
      `;
    mealContainerEL.innerHTML = sorryGifHTML;
  }
};

function closeModal() {
  detailModal.style.display = "none";
}

async function showDetails(e) {
  if (e.target && e.target.className === "detail-btn") {
    let mealId = e.target.id;
    //1. fetch meal details

    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId
    );
    let data = await response.json();

    const meal = data.meals[0];

    // show data in modal
    let html = `
    <img src="${meal.strMealThumb}" />
    <h1>${meal.strMeal}</h1>
    <div class="row">
      <p><span>Category:</span> ${meal.strCategory}</p>
      <p><span>Area:</span> ${meal.strArea}</p>
    </div>

  
    <div class="instructions">
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
    </div>
    `;
    modalContent.innerHTML = html;
    // open modal
    detailModal.style.display = "flex";
  }
}

inputFormEL.addEventListener("submit", fetchRecipe);
closeBtn.addEventListener("click", closeModal);
mealContainerEL.addEventListener("click", showDetails);
