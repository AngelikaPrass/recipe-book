import types from './types';
export const recipeReducer = (state=[], action) => {
    switch (action.type){
        case types.RECIPES_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}