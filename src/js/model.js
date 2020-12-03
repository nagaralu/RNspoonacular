const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: '../../.env' });

export const state = {
  recipe: {},
};

export const loadRecipe = async id => {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const recipe = data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.sourceName,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image,
      servings: recipe.servings,
      cookingTime: recipe.readyInMinutes,
      ingredients: recipe.extendedIngredients,
    };

    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
