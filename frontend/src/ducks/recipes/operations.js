import axios from 'axios';
const actions = require('./actions');

export const getRecipeList = () => {
    return async dispatch => {
        const response = await axios.get('http://localhost:5000/recipes');
        dispatch(actions.getRecipeListAction(response.data));
        return response;
    }
};

export const addNewRecipe = (recipe) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/recipes', recipe);
        if(response.status === 200){
            dispatch(actions.createRecipeAction(recipe));
        }
        else {
            console.log("bad request");
        }
        return response;
    }
};

export const editRecipe = (recipe, recipeId) => {
    return async dispatch => {
        console.log(recipeId)
        const response = await axios.put(`http://localhost:5000/recipes/${recipeId}`, recipe);
        if(response.status === 200){
            dispatch(actions.editRecipeAction(response.data));
        }
        else {
            console.log("bad request");
        }
        return response;
    }
};

export const deleteRecipe = (recipeId) => {
    return async dispatch => {
        const response = await axios.delete(`http://localhost:5000/recipes/${recipeId}`);
        if(response.status === 200){
            dispatch(actions.deleteRecipeAction(recipeId));
        }
        else {
            console.log("bad request");
        }
        return response;
    }
};

