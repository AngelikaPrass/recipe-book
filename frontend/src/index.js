import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./App";
import React from "react";
import store from './ducks/store.js';
import { BrowserRouter } from 'react-router-dom';
import './UI/styles/App.scss';

ReactDOM.render(

    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>

    ,
    document.getElementById('root')
);