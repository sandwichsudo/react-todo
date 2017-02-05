import Router from './router';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UiApi from './api/ui-api';
import config from './config/runtime-config';
var ReactGA = require('react-ga');
ReactGA.initialize(config.GA);

var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");
// Initialize Firebase
firebase.initializeApp(config.FIREBASE);

import './App.scss';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/my-service-worker.js')
           .then(function() {
               console.log('Service Worker 1 Registered');
               window.addEventListener('offline', function(e) {
                     UiApi.showNewNotification({
                         message:'You have gone offline!',
                     });
                     console.log("You are offline");
                 }, false);
           });
}
ReactDOM.render(<Provider store={store}>{Router}</Provider>,
  document.getElementById('root')
);
