import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import React from "react";
import Navbar from "./UI/Navbar";
import { useEffect } from 'react';
import {getRecipeList} from "./ducks/recipes/operations";
import {connect} from "react-redux";
import Home from "./UI/Home";
import RecipesList from "./UI/RecipesList";
import RecipeForm from "./UI/RecipeForm";
import RecipeDetail from "./UI/RecipeDetail";

function App({recipes, getRecipeList}) {
    useEffect(() => { (async () => {
        if(recipes.length === 0){await getRecipeList()}
    })()}, [])

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="recipes/" element={ <RecipesList /> }> </Route>
                <Route path="recipes/:id" element={ <RecipeDetail/>} > </Route>
                <Route path="form/create" element={ <RecipeForm mode="create"/> }> </Route>
                <Route path="form/edit/:id" element={ <RecipeForm mode="edit"/> }> </Route>
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