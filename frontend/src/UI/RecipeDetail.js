import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {connect, useSelector, shallowEqual } from "react-redux";
import {selectRecipe} from "../ducks/recipes/selectors";
import {deleteRecipe, editRecipe } from "../ducks/recipes/operations";

 const RecipeDetail = ({ recipe, deleteRecipe, editRecipe }) => {
     let  { id } = useParams();
     const [data, setData] = useState();
     const recipeFromState = useSelector(state => selectRecipe(state, id), shallowEqual);
     console.log(recipeFromState)

     useEffect(() => {
         if(recipeFromState){
             setData(recipeFromState);
             console.log(recipeFromState);
         }

     }, [recipeFromState])

     return(
         <div>
             {data && <h3> {data.name} </h3>}

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

}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
