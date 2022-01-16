import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {connect, useSelector, shallowEqual } from "react-redux";
import {selectRecipe} from "../ducks/recipes/selectors";
import {deleteRecipe, editRecipe } from "../ducks/recipes/operations";
import { useNavigate } from 'react-router-dom';

 const RecipeDetail = ({ recipe, deleteRecipe}) => {
     let  { id } = useParams();
     const navigate = useNavigate();
     const [data, setData] = useState(recipe);
     const recipeFromState = useSelector(state => selectRecipe(state, id), shallowEqual);
     console.log(recipeFromState)

     useEffect(() => {
         if(recipeFromState){
             setData(recipeFromState);
             console.log(recipeFromState);
         }

     }, [recipeFromState])

     const handleDelete = (id) => {
         deleteRecipe(id);
         alert("deleted recipe");
         navigate(`/recipes`);
     }
     return(
         <div>
             {data && <><h3> {data.name} </h3>
             <img src={data.photo}  alt={`${data.name}`}/>
                 <div> {data.tags} </div>
                 <div> {data.preparationTime} </div>
                 <div> {data.cookingTime} </div>
                 {data.isVegan && <div> vegan </div>}
                 {data.isVegetarian && <div> vegetarian </div>}
                 <ul>
                     Ingredients:
                     {data.ingredients.map(ingredient => <li key={ingredient}> {ingredient} </li>)}
                 </ul>
             <p> {data.recipe} </p>
                 <button onClick={ () => handleDelete(data.id)}> x </button>
                 <Link to={`/form/${data.id}`}> <button> edit </button></Link>
             </>
             }
         </div>
     )
 }


const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    return {
        recipe: selectRecipe(state, id)
    }
}

const mapDispatchToProps  =  {
deleteRecipe, editRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
