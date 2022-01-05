import './App.css';
import RecipesList from "./UI/RecipesList";
import RecipeForm from "./UI/RecipeForm";
import { Provider } from 'react-redux'
import store from './ducks/store'
function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <RecipesList />
              <RecipeForm />
          </div>
      </Provider>

  );
}

export default App;
