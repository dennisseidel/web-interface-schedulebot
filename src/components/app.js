// Create new component. That componetn should produce HTML.
import React, { Component } from 'react';

import Header from './header.js';
import '../../style/app.scss';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
