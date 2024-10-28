import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { state, loadRecipe } from './model.js';
import recipeView from './views/recipeView.js';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await loadRecipe(id);
    recipeView.render(state.recipe);
  } catch (err) {
    console.error(err);
  }
};

['hashchange', 'load'].forEach(evt =>
  window.addEventListener(evt, controlRecipes)
);
