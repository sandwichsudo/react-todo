import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Pages
import Home from './views/authenticated/home/Home.js';
import CatalogueWrap from './views/authenticated/catalogue/CatalogueWrap.js';
import Login from './views/login/Login.js';
import MainLayout from './components/main-layout/MainLayout.js';

export default (
  <Router history={browserHistory}>
      <Route component={MainLayout}>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
          <Route path="/index.html" component={Home} />
          <Route path="/catalogue" component={CatalogueWrap} />
      </Route>
  </Router>
);
