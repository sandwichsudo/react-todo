import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/my-service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
