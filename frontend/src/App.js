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
import Navbar from "./UI/Navbar";

function App() {

  return (
      <Provider store={store}>
        <Navbar />
      </Provider>

  );
}

export default App;
