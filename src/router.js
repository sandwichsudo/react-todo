import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Pages
import App from './App.js';
// import Basket from './views/authenticated/basket/Basket.js';
import Login from './views/login/Login.js';

export default (
  <Router history={browserHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={App} />
  </Router>
);
