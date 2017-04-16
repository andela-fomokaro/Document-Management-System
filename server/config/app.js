/* eslint-disable global-require */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Routes from '../routes/index';
import usersRoutes from '../routes/UsersRoutes';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Document Management System');
});

export default app;
