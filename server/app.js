import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

import './config/database';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.user('app/v1', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
