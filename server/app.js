import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import expressValidator from 'express-validator';
import config from '../webpack.config';
import userRoutes from '../server/routes/userRoutes';
import ideaRoutes from '../server/routes/ideaRoutes';

import './config/database';

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}), );

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1', userRoutes);
app.use('/api/v1', ideaRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`app running on localhost: ${PORT}`);
});

module.exports = app;
