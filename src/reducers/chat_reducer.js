import {
  SEND_CHAT,
  RECIEVE_CHAT,
  ACTIVATE_VOICE,
  DEACTIVATE_VOICE } from '../actions/types';

export default function (state = {
  voiceinterface: false,
  messages: [
    {
      role: 'bot',
      text: 'Hi, how can I help you?',
      timestamp: 100000000,
    },
    {
      role: 'user',
      text: 'I need help with my car insurance',
      timestamp: 100000012,
    },
    {
      role: 'bot',
      text: 'Can I call you?',
      timestamp: 100000020,
    },
    {
      role: 'user',
      text: 'Yes please my number is 123',
      timestamp: 100000025,
    },
    {
      role: 'bot',
      text: 'Mr. Müller is now calling you.',
      timestamp: 100000030,
    },
    {
      role: 'user',
      text: 'Ding Ding Ring Ding, you rock Schedully',
      timestamp: 100000035,
    },
  ] }
  , action) {
  switch (action.type) {
    case SEND_CHAT:
      return { ...state, messages: state.messages.concat(action.payload) };
    case RECIEVE_CHAT:
      return { ...state, messages: state.messages.concat(action.payload) };
    case ACTIVATE_VOICE:
      return { ...state, voiceinterface: true };
    case DEACTIVATE_VOICE:
      return { ...state, voiceinterface: false };
  }
  return state;
}
