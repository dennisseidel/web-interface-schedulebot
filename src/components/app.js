// Create new component. That componetn should produce HTML.
import React, { Component } from 'react';

import BookList from "./book-list.js";
import BookDetail from "./book-detail.js";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Bookshop</h1>
        <BookList />
        <BookDetail />
      </div>
    );
  }
}

export default App;
