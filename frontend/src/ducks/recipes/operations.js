import axios from 'axios';
const actions = require('./actions');

export const getRecipeList = () => {
    return async dispatch => {
        const response = await axios.get('http://localhost:5000/recipes');
        dispatch(actions.getRecipeListAction(response.data));
    }
}
export const addNewRecipe = (recipe) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/recipes', recipe);
        if(response.status === 200){
            dispatch(actions.createRecipeAction(recipe));
        }
    }
}
// export const deleteRecipe = () => {
//     return async dispatch => {
//         const response = await axios.get('http://localhost:5000/recipe')
//     }
// }