
import React from 'react'
import {render } from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import todoApp from './reducers'
import App from './containers/App'

require('./css/index.css');

let store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)