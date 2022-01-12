import types from './types';
export const recipeReducer = (state=[], action) => {
    switch (action.type){
        case types.RECIPES_LIST:
            return [...action.payload];
        case types.RECIPE_CREATE:
            return [...state, action.payload];
        case types.RECIPE_DELETE:
            return [...state.filter(x => x.id !== action.payload)];
        case types.RECIPE_EDIT:
            return [...state.filter(x => {return x.id !== action.payload.id}), action.payload];
            default:
            return state;
    }
}