import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: '../../.env' });

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `${API_URL}${id}/information?apiKey=${process.env.API_KEY}`
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

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `${API_URL}complexSearch?query=${query}&number=20&apiKey=${process.env.API_KEY}`
    );
    console.log(data);

    state.search.results = data.results.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        //publisher: rec.sourceName,
        image: rec.image,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
