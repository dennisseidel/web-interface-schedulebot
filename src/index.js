import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

// Create new component. That componetn should produce HTML.
import App from './components/app.js';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Put components into HTML
ReactDOM.render(<App />, document.querySelector('.container'));
