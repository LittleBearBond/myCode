import React from 'react';
import App from './App';
import routes from './route'
import { StaticRouter } from 'react-router-dom';

const render = function (url, context = {}) {
    return <StaticRouter context={context} location={url}>
        <App />
    </StaticRouter>
}

export {
    render, routes
}
