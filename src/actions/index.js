import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password });
    // if request is good:
    // - update state to indicate user is authenticated
    // - save the JWT token
    // - redirect to the route '/feature'

    // if request is bad:
    // - show an error to the user
  }
}
