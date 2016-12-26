import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// Create new component. That componetn should produce HTML.
import App from './components/app.js';
import SigninForm from './components/auth/signin.js';
import reducers from './reducers/';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// Put components into HTML
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="signin" component={SigninForm} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container'));
