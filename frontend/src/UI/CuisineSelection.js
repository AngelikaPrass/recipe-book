import React, {useEffect, useState} from "react";
import {deleteCuisine, getCuisineList} from "../ducks/cuisines/operations"
import {connect, shallowEqual, useSelector} from 'react-redux';
import {getCuisines} from "../ducks/cuisines/selectors";
import {Link} from "react-router-dom";
//todo
// filtering with searchbar by ingredients in cuisine
// e.g. query "halloumi" will output "greek".
//
const CuisineSelection = ({cuisines, getCuisineList}) => {
    const [data, setData] = useState(cuisines);
    const cuisinesFromState = useSelector(state => getCuisines(state), shallowEqual)

    useEffect(() => {
        async function fetchData(){
            return await getCuisineList();
        }
        if(cuisinesFromState.length !== 0){
            setData(cuisinesFromState);
        }
        else{
            fetchData().then(cuisines => setData(cuisines));
        }
    }, [cuisinesFromState, getCuisineList]);

    const handleDelete = (id) => {
        deleteCuisine(id);
        alert("deleted cuisine");
    }

    return(
        <div>
            {data.map(cuisine => {
                return(
                    <div key={cuisine._id}>
                    <h4>{cuisine.name}</h4>
                        <div>{cuisine.description}</div>
                        <ul> ingredients:
                            {cuisine.ingredients.map(ingredient =>
                           <li key={ingredient}> {ingredient} </li>
                        )}</ul>
                        <button onClick={ () => handleDelete(cuisine._id)}> x </button>
                    </div>
                )}
            )}
            <Link to={'/cuisines/form'}>
                <button> Add new cuisine </button>
            </Link>
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