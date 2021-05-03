import './index.css'
import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import store from './reducers/redux-store'
import { HashRouter } from 'react-router-dom'

render(
    <HashRouter>
        <Provider store={store} >
            <App />
        </Provider>
    </HashRouter>
   ,
    document.getElementById("root")
)