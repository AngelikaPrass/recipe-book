import React, {useState} from 'react';
import { Outlet } from 'react-router';
import {connect} from 'react-redux';
import { getRecipes } from "../ducks/recipes/selectors";
import { getRecipeList, deleteRecipe } from "../ducks/recipes/operations";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const RecipesList = ( {recipes, getRecipeList }) => {
    const [data, setData] = useState(recipes);
    const [filtering, setFiltering] = useState( () => () => true);

    useEffect(() => {
        getRecipeList()
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setData(recipes);
    }, [recipes]);

    const filteredRecipes = data.filter(filtering);

    const handleFiltering = (e) => {
        if(e.target.value !== ''){
            const key = e.target.value;
            setFiltering(() => recipe => recipe[key]);
        }
        else{
            setFiltering(() => () => true);
        }
    }
    return(
        <div>
            <h3> ddd</h3>
            <div>
                <p> Filter </p>
                <form>
                    <ul>
                        <li>
                            vegan:
                            <input type="radio" name="radio" value={"isVegan"} onClick={handleFiltering}/>
                        </li>
                        <li>
                            vegetarian:
                            <input type="radio" name="radio" value={"isVegetarian"} onClick={handleFiltering}/>
                        </li>
                        <li>
                            no filtering:
                            <input type="radio" name="radio" value={""} onClick={handleFiltering}/>
                        </li>

                    </ul>
                </form>
            </div>

            {filteredRecipes.map(recipe => {
                return (
                    <div key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}> <h4> {recipe.name} </h4> </Link>
                        <img src={recipe.photo}  alt={`${recipe.name}`}/>
                        <button onClick={() => {
                            deleteRecipe(recipe.id);
                        }}> x </button>
                        <hr />
                    </div>
                )}
            )}
            <Outlet />
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