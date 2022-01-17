import React, {useEffect, useState} from "react";
import {deleteCuisine, getCuisineList} from "../ducks/cuisines/operations"
import {connect, shallowEqual, useSelector} from 'react-redux';
import {getCuisines} from "../ducks/cuisines/selectors";
import {Link} from "react-router-dom";
import {getRecipes} from "../ducks/recipes/selectors";
import {getRecipeList} from "../ducks/recipes/operations";

//todo
// filtering with searchbar by ingredients in cuisine
// e.g. query "halloumi" will output "greek".
// sorting: by amount of cs, by name, by amount of specific ingredients
//
const CuisineSelection = ({cuisines, recipes, getCuisineList}) => {
    const [data, setData] = useState(cuisines);
    const [containedRecipes, setContainedRecipes] = useState(recipes);
    const [displayedData, setDisplayedData] = useState(cuisines);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtering, setFiltering] = useState( () => () => true);
    const [sorting, setSorting] = useState(()=>()=>1);

    const cuisinesFromState = useSelector(state => getCuisines(state), shallowEqual)
    const recipesFromState = useSelector(state => getRecipes(state), shallowEqual)

    useEffect(() => {
        async function fetchCuisines(){
            return await getCuisineList();
        }
        async function fetchRecipes(){
            return await getRecipeList();
        }

        if(cuisinesFromState.length !== 0 && recipesFromState.length !== 0){
            setData(cuisinesFromState);
            setContainedRecipes(recipesFromState);
        }

        else{
            fetchCuisines().then(cuisines => setData(cuisines));
            fetchRecipes().then(recipes => setContainedRecipes(recipes));

        }
    }, [cuisinesFromState, recipesFromState, getCuisineList, getRecipeList]);

    useEffect(() => {
        setDisplayedData(data.filter(filtering).sort(sorting))
    }, [filtering, sorting, data]);

    const handleDelete = (id) => {
        deleteCuisine(id);
        alert("deleted cuisine");
    }

    const handleSorting = e => {
        switch(e.target.value){
            case 'alphabetASC':
                setSorting(() => (c1, c2) => {
                    return '' + c1.name.localeCompare(c2.name);
                })
                break;
            case 'alphabetDESC':
                setSorting(() => (c1, c2) => {
                    return '' + c2.name.localeCompare(c1.name);
                })
                break;
            case 'ingredientsASC':
                setSorting(() => (c1, c2) => {
                    return '' + c1.ingredients.length > c2.ingredients.length;
                })
                break;
            case 'ingredientsDESC':
                setSorting(() => (c1, c2) => {
                    return '' + c1.ingredients.length < c2.ingredients.length;
                })
                break;
            case 'recipesASC':
                setSorting(() => (c1, c2) => {
                    return '' + recipesInCuisine(c1).length > recipesInCuisine(c2).length
                })
                break;
            case 'recipesDESC':
                setSorting(() => (c1, c2) => {
                    return '' + recipesInCuisine(c1).length < recipesInCuisine(c2).length
                })
                break;
            default:
                setSorting(() => () => 1)
        }
    }

    const searching = (searchTerm) => {
        return (cuisine) => {
            return cuisine.ingredients?.some(x => x.toLowerCase().includes(searchTerm.toLowerCase()));
        }
    };

    useEffect(()=>{
        setFiltering(()=>searching(searchTerm))
    }, [searchTerm])

    const recipesInCuisine = (cuisine) => {
        return containedRecipes.filter(recipe => recipe.cuisineId === cuisine._id)
    }

    return(
    <div>
        <div className="search">
            <input type="text" placeholder="Search for an ingredient..." onChange={e => {
                setSearchTerm(e.target.value)

            }}/>
        </div>


        <div>
            <select name="sort" onChange={handleSorting} defaultValue={"none"}>
                <option value="none"> - </option>
                <option value="alphabetASC"> alphabetically ascending </option>
                <option value="alphabetDESC"> Alphabetically descending </option>
                <option value="ingredientsASC"> By amount of ingredients ascending </option>
                <option value="ingredientsDESC"> By amount of ingredients descending </option>
                <option value="recipesASC"> By amount of recipes ascending </option>
                <option value="recipesDESC"> By amount of recipes descending </option>
            </select>
        </div>


        <div>
            {displayedData.map(cuisine => {
                return(
                    <div key={cuisine._id}>
                    <h4>{cuisine.name}</h4>
                        <img src={cuisine.photo} alt={cuisine.name}/>
                        <div>{cuisine.description}</div>
                        <ul> ingredients:
                            {cuisine.ingredients.map(ingredient =>
                           <li key={ingredient}> {ingredient} </li>
                        )}</ul>
                        <ul> recipes:
                            {recipesInCuisine(cuisine).map(recipe =>
                                <Link to={`/recipes/${recipe._id}`}>
                                    <li key={recipe._id}> {recipe.name}</li>
                                </Link>
                            )}
                        </ul>
                        <button onClick={ () => handleDelete(cuisine._id)}> x </button>
                    </div>
                )}
            )}
            <Link to={'/cuisines/form'}>
                <button> Add new cuisine </button>
            </Link>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cuisines: getCuisines(state)
    };
}

const mapDispatchToProps  = {
    getCuisineList, deleteCuisine
}

export default connect(mapStateToProps, mapDispatchToProps)(CuisineSelection);