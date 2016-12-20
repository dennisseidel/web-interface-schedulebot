export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}

export function signinUser({ email, password }) {
  // Submit email/password to server

  // if request is good:
  // - update state to indicate user is authenticated
  // - save the JWT token
  // - redirect to the route '/feature'

  // if request is bad:
  // - show an error to the user

}
