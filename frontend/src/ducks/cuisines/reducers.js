import types from './types';
export const cuisineReducer = (state=[], action) => {
    switch (action.type){
        case types.CUISINES_LIST:
            return [...action.payload];
        case types.CUISINE_CREATE:
            return [...state, action.payload];
        case types.CUISINE_DELETE:
            return state.filter(x => x._id !== action.payload);
        case types.CUISINE_EDIT:
            return state.map(x => x._id === action.payload._id ? action.payload : x);
        default:
            return state;
    }
}