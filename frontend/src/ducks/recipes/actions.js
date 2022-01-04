import types from './types';

export const getRecipeListAction = (recipes) => ({
    type: types.RECIPES_LIST,
    payload: recipes
});

export const createRecipeAction = (recipe) => ({
    type: types.RECIPE_CREATE,
    payload: recipe
});

export const editRecipeAction = (recipe) => ({
    type: types.RECIPE_EDIT,
    payload: recipe
});

export const deleteRecipeAction = (recipe) => ({
    type: types.RECIPE_DELETE,
    payload: recipe
});
