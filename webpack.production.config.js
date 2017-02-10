const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      query: {
        presets: ['react', 'es2015', 'stage-1'],
      },
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
  resolve:
  {
    extensions: ['', '.json', '.js', '.jsx'],
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
  // devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BACKEND_ROOT_URL: JSON.stringify('https://backend-service-schedulebot.mybluemix.net'),
        AUTH_ROOT_URL: JSON.stringify('https://auth-service-schedulebot.mybluemix.net'),
      },
    }),
    new CopyWebpackPlugin([{
      from: './*.html',
    }]),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
