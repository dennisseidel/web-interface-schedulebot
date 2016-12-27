import React, { Component } from 'react';

import BookList from "./book-list.js";
import BookDetail from "./book-detail.js";

class BookPage extends Component {
  render() {
    return(
      <div>
        <BookList />
        <BookDetail />
      </div>
    );
  }
}

export default BookPage;
