import axios from 'axios';
const actions = require('./actions');

export const getRecipeList = () => {
    return async dispatch => {
        const response = await axios.get('https://localhost:5000/');
        dispatch(actions.getRecipeListAction(response.data));
    }
}