import { API_KEY } from './config.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const showRecipe = async () => {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/214146/information?apiKey=${API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let recipe = data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.sourceName,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image,
      servings: recipe.servings,
      cookingTime: recipe.readyInMinutes,
      ingredients: recipe.extendedIngredients,
    };

    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};

showRecipe();
