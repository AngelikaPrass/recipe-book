export const getCuisines = state => state.cuisines;

export const selectCuisine = (state, cuisineId) => {
    return state.cuisines.find(x => (x._id === cuisineId))
};