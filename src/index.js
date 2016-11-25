import React from 'react';
import ReactDOM from 'react-dom';
// Create new component. That componetn should produce HTML.
const App = () => {
  return <div>Hi!</div>;
}
// Put components into HTML
ReactDOM.render(<App />, document.querySelector('.container'));
