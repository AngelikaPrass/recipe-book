import types from './types';
export const recipeReducer = (state=[], action) => {
    switch (action.type){
        case types.RECIPES_LIST:
            return [...action.payload];
        default:
            return state;
    }
}