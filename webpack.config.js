const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
          'babel-loader',
        ],
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
    },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
  resolve:
  {
    extensions: ['.json', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src'),
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};
