//initial boot up logic for redux
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
//Provider tag allows other components to access app-wide state
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App'
import reducers from './reducers'
//development only axios helpers
import axios from 'axios';
window.axios = axios;

//redux store holds the whole state tree. first argument is reducers, second argument is initial state of application
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
