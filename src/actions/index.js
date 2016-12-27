import axios from 'axios';
import { hashHistory } from 'react-router';

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from './types.js';

const ROOT_URL = 'http://localhost:3090';

export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then((response) => {
      // if request is good:
      // - update state to indicate user is authenticated
      dispatch({type: AUTH_USER });
      // - save the JWT token to localStorage
      localStorage.setItem('token', response.data.token);
      // - redirect to the route '/feature'
      hashHistory.push('/feature');
    })
    .catch(() => {
      // if request is bad:
      // - show an error to the user
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}
