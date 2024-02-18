// DOMContentLoaded Added because there is some issue in loading.
document.addEventListener("DOMContentLoaded", () => {
    const meal_access_btn = document.getElementById("meal-access");  // button to fetch the data from API
    const meal_recipe = document.getElementById("meal-recipe"); //to manipulate the data in a div named meal-recipe

    //making button reactive and fetching data.
    meal_access_btn.addEventListener("click", () => {
      fetch("https://www.themealdb.com/api/json/v1/1/random.php")  //1. fetch the data.
        .then((meal) => meal.json())        //2. convert it into JSON Format
        .then((meal) => {                   //3. then finally pass the fetched data to a function for manipulation.
          generateMeal(meal.meals[0]);
        });
    });
  
    //generateMeal function reperesents a complete meal recipe.
    //@param {JSON} meal - all meal details are passing.
    const generateMeal = (meal) => {
      const items = [];         //array to store the ingredients with there measurements

      //iterating over loop to add the data in array and checking for 20 ingredients as per the json format and check if there are less that 20 ingredients than break the loop for empty string
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          items.push(`${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}`);
        } else {
          break;
        }
      }
  
      //manipulating HTML Doc. All the necessary data is added in the form of HTML.
      const meal_recipe_content = `
        <div class="recipe_container text-center">
            <h1 class="recipe_heading text-center">${meal.strMeal}</h1>
            <center><img src="${meal.strMealThumb}"></center>
            <ul class="recipe_details">
                <li><b>Category:</b> ${meal.strCategory}</li>
                <li><b>Area:</b> ${meal.strArea}</li>
            </ul>
            <h2 class="recipe_subheading">Ingredients</h2>
            <ul class="ingredients_list">
                ${items.map(item => `<li>${item}</li>`).join(' - ')}
            </ul>
            <h2 class="recipe_subheading">Instructions</h2>
            <p>${meal.strInstructions}</p>
        </div>
      `;
  
      //finally adding it in HTML Document.
      meal_recipe.innerHTML = meal_recipe_content;
    };
  });