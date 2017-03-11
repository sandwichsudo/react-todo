import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import UiApi from './api/ui-api';

// Pages
import Activity from './views/authenticated/home/Home.js';
import CatalogueWrap from './views/authenticated/catalogue/CatalogueWrap.js';
import FiltersWrap from './views/authenticated/filters/FiltersWrap.js';

import LoginWrap from './views/login/LoginWrap.js';
import MainLayout from './components/main-layout/MainLayout.js';
import AdminWrap from './views/authenticated/admin/AdminWrap.js';
import AddCreditWrap from './views/authenticated/add-credit/AddCreditWrap.js';
export default (
  <Router history={browserHistory} onUpdate={UiApi.onRouteChange}>
      <Route component={MainLayout}>
          <Redirect from="/" to="/shop" />
          <Redirect path="/index.html" to="/shop" />

          <Route path="/login" component={LoginWrap} />
          <Route path="/shop" component={FiltersWrap} />
          <Route path="/activity" component={Activity} />
          <Route path="/admin" component={AdminWrap} />
          <Route path="/add-credit" component={AddCreditWrap} />
          <Route path="/products/:category" component={CatalogueWrap} />

      </Route>
  </Router>
);
