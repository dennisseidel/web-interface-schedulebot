import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/scss/bootstrap.scss';

import { AUTH_USER } from './actions/types.js';

// Create new component. That componetn should produce HTML.
import App from './components/app.js';
import SigninForm from './components/auth/signin.js';
import SignupForm from './components/auth/signup.js';
import SignoutPage from './components/auth/signout.js';
import BookPage from './components/book-page.js';
import RequireAuth from './components/auth/require_auth.js';
import WelcomePage from './components/welcome-page';
import reducers from './reducers/';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);
const store = createStoreWithMiddleware(reducers, enhancers);

const token = localStorage.getItem('token');
// if token already exist in local storage consider user to be signed in
if (token) {
  // we need to update app state through dispatching an authenticated action
  store.dispatch({ type: AUTH_USER });
}

// Put components into HTML
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={WelcomePage} />
        <Route path="signin" component={SigninForm} />
        <Route path="signout" component={SignoutPage} />
        <Route path="signup" component={SignupForm} />
        <Route path="feature" component={RequireAuth(BookPage)} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container'));
