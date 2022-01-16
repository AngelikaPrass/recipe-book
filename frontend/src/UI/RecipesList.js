import React, {useState} from 'react';
import { Outlet } from 'react-router';
import {connect, shallowEqual, useSelector} from 'react-redux';
import { getRecipes } from "../ducks/recipes/selectors";
import { getRecipeList, deleteRecipe } from "../ducks/recipes/operations";
import {useEffect} from "react";
import {Link} from "react-router-dom";

//todo:
// add a dropdown filter option to filter by cuisines and occasions [tags]


const RecipesList = ( {recipes, getRecipeList, deleteRecipe }) => {
    const [data, setData] = useState(recipes);
    const [sorting, setSorting] = useState(()=>()=>true);
    const [filtering, setFiltering] = useState( () => () => true);

    const recipesFromState = useSelector(state => getRecipes(state), shallowEqual)

    useEffect(() => {
       async function fetchData(){
           const recipes = await getRecipeList();
           console.log(recipes);
           return recipes;
       }
       console.log(recipesFromState);
        if(recipesFromState.length !== 0){
            setData(recipesFromState);
        }
        else{
            fetchData().then(recipes => setData(recipes));
        }
    }, [recipesFromState, getRecipeList]);

    const displayedRecipes = data.filter(filtering).sort(sorting);

    const handleFiltering = (e) => {
        if(e.target.value !== ''){
            const key = e.target.value;
            setFiltering(() => recipe => recipe[key]);
        }
        else{
            setFiltering(() => () => true);
        }
    }



    const handleSorting = e => {
        switch(e.target.value){
            case 'alphabetASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.name.localeCompare(recipe2.name);
                })
                break;
            case 'alphabetDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe2.name.localeCompare(recipe1.name);
                })
                break;
            case 'dateASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.createdOn.localeCompare(recipe2.createdOn);
                })
                break;
            case 'dateDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe2.createdOn.localeCompare(recipe1.createdOn);
                })
                break;
            case 'prepTimeASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.preparationTime.localeCompare(recipe2.preparationTime);
                })
                break;
            case 'prepTimeDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe2.preparationTime.localeCompare(recipe1.preparationTime);
                })
                break;
            case 'ingredientsASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.ingredients.length.localeCompare(recipe2.ingredients.length);
                })
                break;
            case 'ingredientsDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe2.ingredients.length.localeCompare(recipe1.ingredients.length);
                })
                break;
            default:
                setSorting(() => () => true)
        }
    }

    const handleDelete = (id) => {
        deleteRecipe(id);
        alert("deleted recipe");
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
            <div>
                <select name="sort" onChange={handleSorting} defaultValue={"none"}>
                    <option value="none"> - </option>
                    <option value="alphabetASC"> alphabetically ascending </option>
                    <option value="alphabetDESC"> Alphabetically descending </option>
                    <option value="dateASC"> By date ascending </option>
                    <option value="dateDESC"> By date descending </option>
                    <option value="prepTimeASC"> preparation time ascending </option>
                    <option value="prepTimeDESC"> preparation time descending </option>
                    <option value="ingredientsASC"> By amount of ingredients ascending </option>
                    <option value="ingredientsDESC"> By amount of ingredients descending </option>

                </select>
            </div>


    {displayedRecipes.map(recipe => {
                return (
                    <div key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}> <h4> {recipe.name} </h4> </Link>
                        <img src={recipe.photo}  alt={`${recipe.name}`}/>
                        <button onClick={ () => handleDelete(recipe.id)}> x </button>
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
    getRecipeList, deleteRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);