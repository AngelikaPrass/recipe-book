import './UI/styles/App.scss';
import { Route, Routes } from 'react-router-dom'
import React from "react";
import Navbar from "./UI/Navbar";
import { useEffect } from 'react';
import {getRecipeList} from "./ducks/recipes/operations";
import {connect} from "react-redux";
import Home from "./UI/Home";
import RecipesList from "./UI/RecipesList";
import RecipeForm from "./UI/RecipeForm";
import RecipeDetail from "./UI/RecipeDetail";
import CuisineSelection from "./UI/CuisineSelection";
import CuisineForm from "./UI/CuisineForm";
import {getCuisineList} from "./ducks/cuisines/operations";
function App({recipes, getRecipeList, cuisines, getCuisineList}) {

    useEffect(() => {
        if (recipes.length === 0) getRecipeList();
        if (cuisines.length === 0) getCuisineList();

    }, [getRecipeList, recipes, getCuisineList, cuisines]);


    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="recipes" element={ <RecipesList /> }> </Route>
                <Route path="cuisines" element={ <CuisineSelection /> }> </Route>
                <Route path="cuisines/form" element={ <CuisineForm /> }> </Route>
                <Route path="recipes/:id" element={ <RecipeDetail/>} > </Route>
                <Route path="form" element={ <RecipeForm /> }> </Route>
                <Route path="form/:id" element={ <RecipeForm /> }> </Route>
            </Routes>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        cuisines: state.cuisines,
    }
}

const mapDispatchToProps = {
    getRecipeList,
    getCuisineList,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);