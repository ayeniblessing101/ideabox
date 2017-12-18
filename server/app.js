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

app.use('/', express.static(path.join(__dirname, '../api_docs/')));
app.use('/', express.static(path.join(__dirname, '../dist')));

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath,
  }), );
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1', userRoutes);
app.use('/api/v1', ideaRoutes);

app.get('/apiDocs', (req, res) => {
  res.sendFile(path.join(__dirname, '../api_docs/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`app running on localhost: ${PORT}`);
});

module.exports = app;
