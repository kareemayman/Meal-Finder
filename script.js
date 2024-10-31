const searchInput = document.querySelector("input[type=search]")
const searchButton = document.querySelector(".search-button")
const shuffleButton = document.querySelector(".shuffle")
const searchResultString = document.querySelector(
  ".container > h2:first-of-type"
)
const mealGrid = document.querySelector(".grid")

// Meal API Fetch Function When Using Search
function fetchMealResults(meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((respone) => {
      return respone.json()
    })
    .then((data) => {
      let meals = data.meals
      console.log(meals)

      meals.forEach((m) => {
        // Injecting a New Meal Div Inside The Grid
        let newMeal = document.createElement("div")
        newMeal.className = "meal"
        newMeal.innerHTML = `<img src="${m.strMealThumb}" alt="meal">`

        // Saving Name, Src
        newMeal.dataset.mealName = m.strMeal // Saving Meal Name
        newMeal.dataset.mealSrc = m.strSource || m.strYoutube // Saving Meal Source

        mealGrid.append(newMeal)
      })
    })
}

// Search Button Event Listener
searchButton.addEventListener("click", (e) => {
  if (searchInput.value === "") {
    alert("Please Enter A Search Term")
  } else {
    searchResultString.textContent = `Search Results For '${searchInput.value}':`
    mealGrid.innerHTML = ""
    fetchMealResults(searchInput.value)
    searchInput.value = ""
  }
})

// Event Listener For Searching With Enter
searchInput.addEventListener('keyup', e => {
    if (searchInput.value === "") {
        alert("Please Enter A Search Term")
    } else if (e.key === 'Enter'){
        searchResultString.textContent = `Search Results For '${searchInput.value}':`
        mealGrid.innerHTML = ""
        fetchMealResults(searchInput.value)
        searchInput.value = ""
    }
})

// Event For Clicking On A Meal
mealGrid.addEventListener('click', e => {
    if (e.target.matches('.meal')) {
        console.log(e.target.dataset.mealSrc)
        window.open(e.target.dataset.mealSrc, '_blank');
    }
})