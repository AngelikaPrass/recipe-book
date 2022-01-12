import React, {useState} from "react";
import {connect} from 'react-redux';
import { getRecipes } from "../ducks/recipes/selectors";
import { getRecipeList } from "../ducks/recipes/operations";
import {useEffect} from "react";

const MealSelection = ({recipes, getRecipeList }, props) => {
    const [data, setData] = useState(recipes);
    useEffect(() => {
        getRecipeList()
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setData(recipes);
    }, [recipes]);

    const meals = data.map(recipe => recipe.tags)

    return(
        <div>
            {meals}
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipes: getRecipes(state)
    };
}

const mapDispatchToProps  = {
    getRecipeList
}

export default connect(mapStateToProps, mapDispatchToProps)(MealSelection);