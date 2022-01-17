import './App.css';
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
function App({recipes, getRecipeList}) {
    useEffect(() => {
        if (recipes.length === 0) getRecipeList();
    }, [getRecipeList, recipes]);


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
        recipes: state.recipes
    }
}

const mapDispatchToProps = {
    getRecipeList
}

export default connect(mapStateToProps, mapDispatchToProps)(App);