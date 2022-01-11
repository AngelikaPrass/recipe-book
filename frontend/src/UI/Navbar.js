import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RecipesList from "./RecipesList";
import RecipeForm from "./RecipeForm";

const Navbar = () => {
    return(
        <div>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/recipes">Recipes</Link>
                        </li>
                        <li>
                            <Link to="/form">Form</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/recipes" element={<RecipesList/>} />
                    <Route path="/form" element={<RecipeForm/>} />
                </Routes>

            </Router>
        </div>
    )
}
export default Navbar;