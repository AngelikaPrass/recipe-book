import {Link, useParams} from 'react-router-dom';
import {connect, shallowEqual, useSelector} from "react-redux";
import {selectRecipe} from "../ducks/recipes/selectors";
import {deleteRecipe, editRecipe } from "../ducks/recipes/operations";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";

 const RecipeDetail = ({recipe, deleteRecipe}) => {
     const [details, setDetails] = useState(null);
     const navigate = useNavigate();
     const {id} = useParams();
     const recipeFromState = useSelector(state => selectRecipe(state, id), shallowEqual);
     useEffect(() => { (async () => {
         if(recipeFromState){
             setDetails(recipeFromState)
         }
     })()}, [recipeFromState, recipe])

     const handleDelete = () => {
         deleteRecipe(recipe.id);
         alert("deleted recipe");
         navigate(`/recipes`);
     }

     const displayTime = time => {
         switch(time){
             case 0:
                 return "-";
             case 10:
                 return "less than 10 minutes";
             case 20:
             case 25:
                 return "less than 30 minutes";
             case 45:
                 return "30 minutes - 1 hour";
             case 90:
                 return "1 - 2 hours";
             case 500:
                 return "overnight";
             default:
                 return ""
         }
     }

     const displayDiet = recipe => {
         if(recipe.isVegetarian && !recipe.isVegan){
             return "vegetarian";
         }
         else if(recipe.isVegan){
             return "vegan";
         }
     }

     return(
         <div>
             {details && <><h3> {details.name} </h3>
             <img className="img-fluid w-75" src={details.photo}  alt={`${details.name}`}/>
                 <div> {details.tags} </div>
                 <div> preparation time: {displayTime(details.preparationTime)} </div>
                 <div> cooking time: {displayTime(details.cookingTime)} </div>

                 {<div> {displayDiet(details)} </div>}

                 <ul>
                     Ingredients:
                     {details.ingredients.map(ingredient => <li key={ingredient}> {ingredient} </li>)}
                 </ul>

                 <p> {(details.recipe).replace(/ (?=[0-9]+\.)/g, "\n").split("\n").map(e =>
                     (
                     <div> {e} </div>
                     ))} </p>
                 <button className="btn btn-danger" onClick={ () => handleDelete(details._id)}> x </button>
                 <Link to={`/form/${details._id}`}> <button className="btn btn-primary"> edit </button></Link>
             </>
             }
         </div>
     )
 }



const mapDispatchToProps  =  {
    deleteRecipe, editRecipe
}

export default connect(null, mapDispatchToProps)(RecipeDetail);
