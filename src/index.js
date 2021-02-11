import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'

import App from './App';
import './scss/app.scss';
// import store from './redux/redusers/films'
// import rootReduser from './redux/redusers';

import store from './redux/store';

// const store = createStore(rootReduser);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
