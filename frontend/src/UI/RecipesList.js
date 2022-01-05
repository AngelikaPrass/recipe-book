import React from 'react';
import {connect} from 'react-redux';
import { getRecipes } from "../ducks/recipes/selectors";
// import { getRecipeList } from "../ducks/recipes/operations";
import {useEffect} from "react";

const RecipesList = ({recipes}) => {
    // useEffect(()=>{getRecipeList();}, []);
    useEffect(()=>{getRecipes(recipes)}, []);
    return(
        <div>
            {recipes.map(recipe => (<div> {recipe.name} </div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipes: state
    };
}
export default connect(mapStateToProps)(RecipesList);