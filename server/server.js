const express = require('express');
const path = require('path');
const compress = require('compression');

const port = process.env.PORT || 3000;
const app = express();

console.log('ENV', process.env);

// Apply gzip compression
app.use(compress());

// Serve static assets from ~/public since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
// when the application is compiled.
app.use(express.static(path.join(__dirname, '..', 'public')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
});
