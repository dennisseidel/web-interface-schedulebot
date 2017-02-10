import axios from 'axios';
import { hashHistory } from 'react-router';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  SEND_CHAT,
  RECIEVE_CHAT,
} from './types';
import { socket } from '../components/chat';
import { BACKEND_ROOT_URL } from '../components/chat';

const ROOT_URL = process.env.AUTH_ROOT_URL || 'http://localhost:3090';


export function record() {
  return function (dispatch) {
    axios.get(`${BACKEND_ROOT_URL}/watsoncloud/stt/token`)
    .then((res) => {
      console.log('res:', res.data);
      const stream = recognizeMicrophone({
        token: res.data.token,
        continuous: false, // false = automatically stop transcription the first time a pause is detected
      });
      stream.setEncoding('utf8');
      stream.on('error', (err) => {
        console.log(err);
      });
      stream.on('data', (msg) => {
        dispatch(sendChat({
          role: 'user',
          text: msg,
          timestamp: Date.now(),
        }));
      });
    })
    .catch((err) => {
      console.log(`The following gUM error occured: ${err}`);
    });
  };
}

export function recieveChat(message) {
  return function (dispatch) {
    dispatch(
      {
        type: RECIEVE_CHAT,
        payload: message,
      });
    dispatch(record());
  };
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
      // - redirect to the route '/chat'
      hashHistory.push('/chat');
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
      hashHistory.push('/chat');
    })
    .catch((error) => {
      dispatch(authError(error.response.data.error));
    });
  };
}
