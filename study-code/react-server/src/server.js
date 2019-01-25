import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from './route';

import App from '../src/App';
console.log(__dirname)
const app = express();

const template = fs.readFileSync(path.resolve('./dist/index.html'), 'utf8')

app.get('/*', (req, res) => {
    const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
    const promise = currentRoute.fetchData ? currentRoute.fetchData() : Promise.resolve(null);

    promise.then(data => {
        const context = {
            data,
        };
        const renderedString = renderToString(
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>
        );

        res.send(
            template.replace('<!--render-string-->', renderedString)
                .replace('<!--init-data-->', `<script>window.__ROUTE_DATA__ = ${JSON.stringify(data)}</script>`)
        )
    }).catch(console.log);
});

app.listen(3000);
