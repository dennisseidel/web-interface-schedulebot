import React, { Component } from 'react';

import BookList from './book-list.js';
import BookDetail from './book-detail.js';
import Chat from './chat';

class BookPage extends Component {
  render() {
    return (
      <div className="text-center mx-5">
        <Chat />
      </div>
    );
  }
}

export default BookPage;
