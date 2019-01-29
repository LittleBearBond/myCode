import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.hydrate(
    <Router history={history}>
        <App />
    </Router>
    , document.getElementById('root'));
