import types from './types';
export const recipeReducer = (state=[], action) => {
    switch (action.type){
        case types.RECIPES_LIST:
            return [...action.payload];
        case types.RECIPE_CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}