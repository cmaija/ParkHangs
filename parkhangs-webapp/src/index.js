import React from 'react'
import { render } from 'react-dom'
import { configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './router/Routes'
import thunk from 'redux-thunk'
import ApiService from 'services/api.service'

ApiService.init()

const store = configureStore({
    middlewares: thunk,
    reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers/index', () => {
    const newRootReducer = require('./reducers/index').default
    store.replaceReducer(newRootReducer)
  })
}

render(
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
