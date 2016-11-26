import { combineReducers } from 'redux';
import ReducerBooks from './reducer_books.js';
import ActiveBook from './reducer_active_book.js';

const rootReducer = combineReducers({
  books: ReducerBooks,
  activeBook: ActiveBook
});

export default rootReducer;
