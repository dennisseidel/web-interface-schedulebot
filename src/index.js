import React from 'react';
import ReactDOM from 'react-dom';

// Create new component. That componetn should produce HTML.
import App from './components/app.js';

// Put components into HTML
ReactDOM.render(<App />, document.querySelector('.container'));
