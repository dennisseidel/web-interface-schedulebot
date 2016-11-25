// Create new component. That componetn should produce HTML.
import React, { Component } from 'react';

import BookList from "./book-list.js";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Bookshop</h1>
        <BookList />
      </div>
    );
  }
}

export default App;
