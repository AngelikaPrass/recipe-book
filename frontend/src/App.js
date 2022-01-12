import './App.css';
import { Outlet } from 'react-router';
import { Provider } from 'react-redux';
import store from './ducks/store'
import React from "react";
import Navbar from "./UI/Navbar";

function App() {
  return (
      <Provider store={store}>
          <Navbar />
          <Outlet />
      </Provider>
  );
}

export default App;
