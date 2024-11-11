import 'core-js/actual';
import 'regenerator-runtime/runtime';

import { state, loadRecipe } from './model.js';
import recipeView from './views/recipeView.js';

export const controlRecipes = async () => {
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

// init function runs as soon as program loads
const init = function () {
  // here we subscribe to the events by passing in the controlRecipes function to the event handler(s)
  // we immediately run addHanldeRender, which is listening /for events in the view
  recipeView.addHandlerRender(controlRecipes);
};

init();
