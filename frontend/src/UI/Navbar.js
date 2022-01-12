import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {

    return(
        <div>
            <nav>
                <ul>
                    <li> <Link to='/'> Home </Link> </li>
                    <li> <Link to='/recipes'> Recipes </Link> </li>
                    <li> <Link to='/meals'> Meals </Link> </li>
                    <li> <Link to='/form/create'> Add new recipe </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;