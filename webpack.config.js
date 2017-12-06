import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: ['webpack-hot-middleware/client', './client/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
      },
    ],
  },
};
