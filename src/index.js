import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// Create new component. That componetn should produce HTML.
import App from './components/app.js';
import reducers from './reducers/';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Put components into HTML
ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container'));
