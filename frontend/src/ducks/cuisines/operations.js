import axios from 'axios';
const actions = require('./actions');

export const getCuisineList = () => {
    return async dispatch => {
        const response = await axios.get('http://localhost:5000/cuisines');
        dispatch(actions.getCuisineListAction(response.data));
        return response;
    }
};

export const addNewCuisine = (cuisine) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/cuisines', cuisine);
        if(response.status === 200){
            dispatch(actions.createCuisineAction(cuisine));
        }
        else {
            console.log("bad request");
        }
        return response;
    }
};

export const editCuisine = (cuisine, cuisineId) => {
    return async dispatch => {
        const response = await axios.put(`http://localhost:5000/cuisines/${cuisineId}`, cuisine);
        if(response.status === 200){
            dispatch(actions.editCuisineAction(cuisine));
        }
        else {
            console.log("bad request");
        }
        return response;
    }
};

export const deleteCuisine = (cuisineId) => {
    return async dispatch => {
        const response = await axios.delete(`http://localhost:5000/cuisines/${cuisineId}`);
        if(response.status === 200){
            dispatch(actions.deleteCuisineAction(cuisineId));
        }
        else {
            console.log("bad request");
        }
        return response;
    }
};

