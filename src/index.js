import Router from './router';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UiApi from './api/ui-api';

var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");
// Initialize Firebase
import { firebaseConf } from './config/constants';
firebase.initializeApp(firebaseConf);

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
