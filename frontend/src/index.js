import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Home from "./UI/Home";
import MealSelection from "./UI/MealSelection";
import RecipesList from "./UI/RecipesList";
import RecipeDetail from "./UI/RecipeDetail";
import RecipeForm from "./UI/RecipeForm";
import React from "react";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="meals" element={<MealSelection />}>
                </Route>
                <Route path="recipes" element={<RecipesList />}>
                    <Route path=":recipeId" element = {<RecipeDetail /*animate={true}*//>} />
                </Route>
                <Route path="form" element={<RecipeForm />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    rootElement
);