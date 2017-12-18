import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import expressValidator from 'express-validator';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import config from '../webpack.config';
import userRoutes from '../server/routes/userRoutes';
import ideaRoutes from '../server/routes/ideaRoutes';

import './config/database';

const app = express();
const compiler = webpack(config);

const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/api', express.static(path.join(__dirname, '../api_docs/')));

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath,
  }), );
  app.use(webpackHotMiddleware(compiler));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1', userRoutes);
app.use('/api/v1', ideaRoutes);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.get('/apiDocs', (req, res) => {
  res.sendFile(path.join(__dirname, '../api_docs/index.html'));
});

app.listen(PORT, () => {
  console.log(`app running on localhost: ${PORT}`);
});

module.exports = app;
