import types from './types';

export const getCuisineListAction = (cuisines) => ({
    type: types.CUISINES_LIST,
    payload: cuisines
});

export const createCuisineAction = (cuisine) => ({
    type: types.CUISINE_CREATE,
    payload: cuisine
});

export const editCuisineAction = (cuisine) => ({
    type: types.CUISINE_EDIT,
    payload: cuisine
});

export const deleteCuisineAction = (cuisine) => ({
    type: types.CUISINE_DELETE,
    payload: cuisine
});
