const searchInput = document.querySelector("input[type=search]")
const searchButton = document.querySelector(".search-button")
const shuffleButton = document.querySelector(".shuffle")
const searchResultString = document.querySelector(
  ".container > h2:first-of-type"
)
const mealGrid = document.querySelector(".grid")

function fetchMealResults(meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((respone) => {
      return respone.json()
    })
    .then((data) => {
      let meals = data.meals
      console.log(meals)

      meals.forEach((m) => {
        let newMeal = document.createElement("div")
        newMeal.className = "meal"
        newMeal.innerHTML = `<img src="${m.strMealThumb}" alt="meal">`
        mealGrid.append(newMeal)
      })
    })
}

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
