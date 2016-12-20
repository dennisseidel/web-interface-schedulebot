import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHostory } from 'react-router';

// Create new component. That componetn should produce HTML.
import App from './components/app.js';
import reducers from './reducers/';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Put components into HTML
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHostory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container'));
