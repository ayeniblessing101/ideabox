const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './app/server/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer',
    }),
  ],
  module: {
    rules: [
      // js
      {
        test: /\.js$|.jsx$/,
        use: 'babel-loader',
        include: path.join(__dirname, 'client'),
        exclude: /(node_module)/,
      },
      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loaedr',
          },
        ],
      },
      // scss
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader?importLoaders=1',
        }),
      },
      // fonts
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=./client/fonts/[name].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 250000,
        },
      },
      {
        test: /materialize-css\/bin\//,
        loader: 'imports?jQuery=jquery,$=jquery,hammerjs',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.jsx', '.js', 'png', '.scss'],
  },
};
