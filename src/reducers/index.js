import { combineReducers } from 'redux';
import ReducerBooks from './reducer_books.js';

const rootReducer = combineReducers({
  books: ReducerBooks
});

export default rootReducer;
