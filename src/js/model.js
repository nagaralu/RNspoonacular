import { API_URL } from './config';
import { getJSON } from './helper';
const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: '../../.env' });

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `${API_URL}/${id}/information?apiKey=${process.env.API_KEY}`
    );

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
    throw error;
  }
};
