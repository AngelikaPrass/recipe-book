import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router';
import {connect, shallowEqual, useSelector} from 'react-redux';
import {getRecipes} from "../ducks/recipes/selectors";
import {deleteRecipe, getRecipeList} from "../ducks/recipes/operations";
import {Link} from "react-router-dom";

//todo:
// add a dropdown filter option to filter by cuisines and occasions [tags]
//

const RecipesList = ( {recipes, getRecipeList, deleteRecipe }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState(recipes);
    const [sorting, setSorting] = useState(()=>()=>1);
    const [filtering, setFiltering] = useState( () => () => true);
    const [filtering2, setFiltering2] = useState( () => () => true);
    const [displayedData, setDisplayedData] = useState(recipes);
    const recipesFromState = useSelector(state => getRecipes(state), shallowEqual)

    useEffect(() => {
       async function fetchData(){
           return await getRecipeList();
       }
        if(recipesFromState.length !== 0){
            setData(recipesFromState);
        }
        else{
            fetchData().then(recipes => setData(recipes));
        }
    }, [recipesFromState, getRecipeList]);
    useEffect(() => {
        setDisplayedData(data.filter(e => filtering(e) && filtering2(e)).sort(sorting))
    }, [filtering, filtering2, sorting, data]);

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
                    return '' + recipe1.createdOn > recipe2.createdOn;
                })
                break;
            case 'dateDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.createdOn < recipe2.createdOn;

                })
                break;
            case 'prepTimeASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.preparationTime > recipe2.preparationTime;
                })
                break;
            case 'prepTimeDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.preparationTime < recipe2.preparationTime;
                })
                break;
            case 'ingredientsASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.ingredients.length > recipe2.ingredients.length;
                })
                break;
            case 'ingredientsDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.ingredients.length < recipe2.ingredients.length;
                })
                break;
            default:
                setSorting(() => () => 1)
        }
    }

    const handleDelete = (id) => {
        deleteRecipe(id);
        alert("deleted recipe");
    }

    const searching = (searchTerm) => {
        return (recipe) => {
            return recipe.ingredients?.some(x => x.toLowerCase().includes(searchTerm.toLowerCase()));
        }
    };

    useEffect(()=>{
        setFiltering2(()=>searching(searchTerm))
    }, [searchTerm])

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

            <div className="search">
                <input type="text" placeholder="Search for an ingredient..." onChange={e => {
                    setSearchTerm(e.target.value)

                }}/>
            </div>


    {displayedData.map(recipe => {
                return (
                    <div key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}> <h4> {recipe.name} </h4> </Link>
                        <img src={recipe.photo}  alt={`${recipe.name}`}/>
                        <button onClick={ () => handleDelete(recipe._id)}> x </button>
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