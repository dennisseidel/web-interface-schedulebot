import axios from 'axios';
import { hashHistory } from 'react-router';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import { reset } from 'redux-form';
import { store } from '../index';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  SEND_CHAT,
  RECIEVE_CHAT,
  ACTIVATE_VOICE,
  DEACTIVATE_VOICE,
} from './types';
import { socket } from '../components/chat';
import { BACKEND_ROOT_URL } from '../components/chat';

const ROOT_URL = process.env.AUTH_ROOT_URL || 'http://localhost:3090';

export function deactivateVoiceInterface() {
  return {
    type: DEACTIVATE_VOICE,
  };
}

export function activateVoiceInterface() {
  return {
    type: ACTIVATE_VOICE,
  };
}

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
    if (store.getState().chat.voiceinterface) {
      // encode text
      axios.get(`${BACKEND_ROOT_URL}/watsoncloud/tts/token`)
      .then((res) => {
        const voice = 'en-US_AllisonVoice';
        const format = 'audio/ogg;codecs=opus';
        const wsURI = `wss://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=${voice}&watson-token=${res.data.token}`;

        function onOpen(evt) {
          const speechMessage = {
            text: message.text,
            accept: format,
          };
          // The service currently accepts a single message per WebSocket connection.
          websocket.send(JSON.stringify(speechMessage));
        }

        const audioParts = [];
        let finalAudio;

        function onMessage(evt) {
          if (typeof evt.data === 'string') {
            console.log('Received string message: ', evt.data);
          } else {
            console.log(`Received ${evt.data.size} binary bytes`, evt.data.type);
            audioParts.push(evt.data);
          }
        }

        function onClose(evt) {
          console.log('WebSocket closed', evt.code, evt.reason);
          finalAudio = new Blob(audioParts, { type: format });
          const audio = document.createElement('audio');
          audio.autoplay = true;
          audio.load();
          audio.addEventListener('load', () => audio.play(), true);
          const blobUrl = URL.createObjectURL(finalAudio);
          audio.src = blobUrl;
          audio.onloadedmetadata = function () {
            console.log('final audio duration: ', audio.duration);
            setTimeout(() => dispatch(record()), audio.duration * 1000);
          };
        }

        function onError(evt) {
          console.log('WebSocket error', evt);
        }

        var websocket = new WebSocket(wsURI);
        websocket.onopen = onOpen;
        websocket.onclose = onClose;
        websocket.onmessage = onMessage;
        websocket.onerror = onError;
      })
     .catch((err) => {
       console.log(`The following gUM error occured: ${err}`);
     });
    }
  };
}

export function sendChat(message) {
  return function (dispatch) {
    const jwt = localStorage.getItem('token');
    socket.emit('chat-input', jwt, message);
    dispatch({
      type: SEND_CHAT,
      payload: message });
    // reset form after input http://redux-form.com/6.0.0-alpha.4/docs/faq/HowToClear.md/
    dispatch(reset('chatForm'));
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
