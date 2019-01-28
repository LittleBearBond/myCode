import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import './css/index.scss'

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post" component={Post} />
        </Switch>
    </div>
)
