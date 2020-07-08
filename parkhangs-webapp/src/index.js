import React from 'react'
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './router/Routes'

const store = configureStore({
    reducer: rootReducer
})

render(
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
)
