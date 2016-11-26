// state argument referes not to application state but
// to the piece of state the reducer is responsible for.
export default function( state = null, action ) {
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
  }
  return state
}
