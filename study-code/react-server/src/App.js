import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import HooksTest from './pages/HooksTest';
import { setConfig } from 'react-hot-loader'

import './css/index.scss'

setConfig({ pureSFC: true })

export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/hooktest" component={HooksTest} />
        <Route render={() => <h1>404</h1>} />
    </Switch>
)
