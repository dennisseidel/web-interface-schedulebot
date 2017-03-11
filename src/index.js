import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import reduxThunk from 'redux-thunk';

//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/scss/bootstrap.scss';

import { AUTH_USER } from './actions/types.js';

// Create new component. That componetn should produce HTML.
import App from './components/app';
import SigninForm from './components/auth/signin';
import SignupForm from './components/auth/signup';
import SignoutPage from './components/auth/signout';
import ChatPage from './components/chat-page';
import RequireAuth from './components/auth/require_auth';
import WelcomePage from './components/welcome-page.jsx';
import reducers from './reducers/';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export const store = createStoreWithMiddleware(reducers, enhancers);

const token = localStorage.getItem('token');
// if token already exist in local storage consider user to be signed in
if (token) {
  // we need to update app state through dispatching an authenticated action
  store.dispatch({ type: AUTH_USER });
}

// check if allready authenticated and redirect if yes to /chat
function checkAuth() {
  if (store.getState().auth.authenticated) {
    hashHistory.push('/chat');
  } 
}

// Put components into HTML
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route exact path="/" component={App}>
        <IndexRoute component={WelcomePage} onEnter={checkAuth}/>
        <Route path="signin" component={SigninForm} />
        <Route path="signout" component={SignoutPage} />
        <Route path="signup" component={SignupForm} />
        <Route path="chat" component={RequireAuth(ChatPage)} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container'));
