// Create new component. That componetn should produce HTML.
import React, { Component } from 'react';

import Header from "./header.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
