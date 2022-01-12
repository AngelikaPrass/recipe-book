export const getRecipes = state => state.recipes;

export const selectRecipe = (state, recipeId) => {
    return state.recipes.find(x => (x.id === recipeId))
};