import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import UiApi from './api/ui-api';

// Pages
import Basket from './views/authenticated/home/Home.js';
import CatalogueWrap from './views/authenticated/catalogue/CatalogueWrap.js';
import LoginWrap from './views/login/LoginWrap.js';
import MainLayout from './components/main-layout/MainLayout.js';
import AdminWrap from './views/authenticated/admin/AdminWrap.js';
export default (
  <Router history={browserHistory} onUpdate={UiApi.onRouteChange}>
      <Route component={MainLayout}>
          <Route path="/login" component={LoginWrap} />
          <Route path="/" component={CatalogueWrap} />
          <Route path="/shop" component={CatalogueWrap} />
          <Route path="/index.html" component={CatalogueWrap} />
          <Route path="/tab" component={Basket} />
          <Route path="/admin" component={AdminWrap} />
      </Route>
  </Router>
);
