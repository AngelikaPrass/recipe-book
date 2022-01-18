import {Link, useParams} from 'react-router-dom';
import {connect, useSelector } from "react-redux";
import {selectRecipe} from "../ducks/recipes/selectors";
import {deleteRecipe, editRecipe } from "../ducks/recipes/operations";
import { useNavigate } from 'react-router-dom';

 const RecipeDetail = ({deleteRecipe}) => {
     
     const navigate = useNavigate();
     const {id} = useParams();
     const recipe = useSelector(state => selectRecipe(state, id));


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
             {recipe && <><h3> {recipe.name} </h3>
             <img src={recipe.photo}  alt={`${recipe.name}`}/>
                 <div> {recipe.tags} </div>
                 <div> preparation time: {displayTime(recipe.preparationTime)} </div>
                 <div> cookingTime: {displayTime(recipe.cookingTime)} </div>

                 {<div> {displayDiet(recipe)} </div>}
                 <ul>
                     Ingredients:
                     {recipe.ingredients.map(ingredient => <li key={ingredient}> {ingredient} </li>)}
                 </ul>
             <p> {recipe.recipe} </p>
                 <button onClick={ () => handleDelete(recipe._id)}> x </button>
                 <Link to={`/form/${recipe._id}`}> <button> edit </button></Link>
             </>
             }
         </div>
     )
 }



const mapDispatchToProps  =  {
    deleteRecipe, editRecipe
}

export default connect(null, mapDispatchToProps)(RecipeDetail);
