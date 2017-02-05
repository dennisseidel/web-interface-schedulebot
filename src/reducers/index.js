import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;
