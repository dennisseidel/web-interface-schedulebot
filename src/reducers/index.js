import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ReducerBooks from './reducer_books.js';
import ActiveBook from './reducer_active_book.js';
import authReducer from './auth_reducer.js';

import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  books: ReducerBooks,
  activeBook: ActiveBook,
  chat: chatReducer,
});

export default rootReducer;
