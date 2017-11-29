const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './server/app',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: bundle.js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  }
};
