import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Pages
import App from './App.js';
//import Basket from './views/authenticated/basket/Basket.js';
import CatalogueWrap from './views/authenticated/catalogue/Catalogue-Wrap.js';
import Login from './views/login/Login.js';
import MainLayout from './components/main-layout/main-layout.js';

export default (
  <Router history={browserHistory}>
      <Route component={MainLayout}>
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
          <Route path="/index.html" component={App} />
          <Route path="/catalogue" component={CatalogueWrap} />
      </Route>
  </Router>
);
