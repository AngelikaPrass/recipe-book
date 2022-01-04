import React from 'react';
import { connect } from 'react-redux';
import {getRecipeListAction } from "../ducks/recipes/actions";

const RecipesList = ({recipes, getRecipeListAction}, props) => {
    return(
        <div>
            {recipes.map(recipe => (<div> {recipe.name} </div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
    };
}
export default connect(mapStateToProps)(RecipesList);