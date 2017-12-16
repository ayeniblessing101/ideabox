import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    new webpack.optimize.OccurenceOrderPlugin(),
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
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
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
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
};
