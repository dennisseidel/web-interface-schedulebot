import {
  FETCH_BOOKS
} from '../actions/types.js';

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_BOOKS:
      return { ...state, books: action.payload };
  }
  return state;
};
