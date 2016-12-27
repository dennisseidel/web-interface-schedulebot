// Create new component. That componetn should produce HTML.
import React, { Component } from 'react';

import BookList from "./book-list.js";
import BookDetail from "./book-detail.js";

import Header from "./header.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <BookList />
        <BookDetail />
      </div>
    );
  }
}

export default App;
