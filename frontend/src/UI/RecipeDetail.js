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
     return(
         <div>
             {recipe && <><h3> {recipe.name} </h3>
             <img src={recipe.photo}  alt={`${recipe.name}`}/>
                 <div> {recipe.tags} </div>
                 <div> {recipe.preparationTime} </div>
                 <div> {recipe.cookingTime} </div>
                 {recipe.isVegan && <div> vegan </div>}
                 {recipe.isVegetarian && <div> vegetarian </div>}
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
