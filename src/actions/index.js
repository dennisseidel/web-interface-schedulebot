import axios from 'axios';
import { hashHistory } from 'react-router';

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_BOOKS,
  SEND_CHAT,
  RECIEVE_CHAT
} from './types.js';
import { socket } from '../components/chat';

const ROOT_URL = process.env.AUTH_ROOT_URL || 'http://localhost:3090';

export function recieveChat(message) {
  return {
    type: RECIEVE_CHAT,
    payload: message,
  }
}

export function sendChat(message) {
  return function (dispatch) {
    const jwt = localStorage.getItem('token');
    socket.emit('chat-input', jwt, message);
    dispatch({ 
      type: SEND_CHAT,
      payload: message });
  };
}

export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book,
  };
}

export function signinUser({ email, password }) {
  return function (dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then((response) => {
      // if request is good:
      // - update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
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
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    // submit email & password to server to '/signup'
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      hashHistory.push('/feature');
    })
    .catch((error) => {
      dispatch(
        authError(error.response.data.error),
      );
    });
  };
}

export function fetchBooks() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((response) => {
      dispatch({
        type: FETCH_BOOKS,
        payload: response.data,
      });
    });
  };
}
