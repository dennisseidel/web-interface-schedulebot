export default function (state = {}, action) {
  // switch(action.type) {
  //   case AUTH_USER:
  //     return { ...state, error: '', authenticated: true };
  //   case UNAUTH_USER:
  //     return { ...state, authenticated: false };
  //   case AUTH_ERROR:
  //     return { ...state, error: action.payload };
  // }
  // return state;
  return { ...state,
    chat: [
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
        timestamp: 100000030,
      },
      {
        role: 'bot',
        text: 'Mr. Müller is now calling you.',
        timestamp: 100000020,
      },
      {
        role: 'user',
        text: 'Ding Ding Ring Ding, you rock Schedully',
        timestamp: 100000030,
      },
    ],
  };
}
