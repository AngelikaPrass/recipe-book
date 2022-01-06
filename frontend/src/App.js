import './App.css';
import RecipesList from "./UI/RecipesList";
import RecipeForm from "./UI/RecipeForm";
import { Provider } from 'react-redux'
import store from './ducks/store'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

function App() {

  return (
      <Provider store={store}>
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
      </Provider>

  );
}

export default App;
