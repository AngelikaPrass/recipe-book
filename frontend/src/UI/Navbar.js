import './styles/App.scss';
import './styles/Navbar.scss';
import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {

    return(
            <nav>
                <ul className="navbar">
                    <li> <Link to='/'> Home </Link> </li>
                    <li> <Link to='/recipes'> Recipes </Link> </li>
                    <li> <Link to='/cuisines'> Cuisines </Link> </li>
                    <li> <Link to='/form'> Add new recipe </Link></li>
                </ul>
            </nav>
    )
}

export default Navbar;