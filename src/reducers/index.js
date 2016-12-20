import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

import ReducerBooks from './reducer_books.js';
import ActiveBook from './reducer_active_book.js';

const rootReducer = combineReducers({
  form: reducer,
  
  books: ReducerBooks,
  activeBook: ActiveBook
});

export default rootReducer;
