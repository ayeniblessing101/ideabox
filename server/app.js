import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import userRoutes from '../server/routes/userRoutes';

import './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log(`app running on localhost: ${PORT}`);
});

module.exports = app;
