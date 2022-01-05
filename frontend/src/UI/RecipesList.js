import React from 'react';
import {connect} from 'react-redux';
import { getRecipes } from "../ducks/recipes/selectors";
import { getRecipeList } from "../ducks/recipes/operations";
import {useEffect} from "react";

const RecipesList = ( {recipes, getRecipeList }, props ) => {
    useEffect(()=>{
        getRecipeList()
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    return(
        <div>
            <h3> ddd</h3>
            {recipes.map(recipe => {return (<div key={recipe.id}> <h4> {recipe.name} </h4> <img src={recipe.photo} /></div>)})}
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipes: getRecipes(state)
    };
}

const mapDispatchToProps  = {
    getRecipeList
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);