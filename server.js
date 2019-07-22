/* eslint-disable no-unused-vars */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import winston from 'winston';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import db from './server/models/index';

require('dotenv').config();

const port = process.env.PORT || 7000;
const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler),
);
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.set('port', port);
const userRoute = require('./server/routes/UsersRoutes')(app);
const documentRoute = require('./server/routes/DocumentsRoutes')(app);
const RoleRoutes = require('./server/routes/RolesRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

db.sequelize.sync().done(() => {
  app.listen(port, () => {
    winston.info('Hi I am running at 127.0.0.1:7000');
  });
});

module.exports = app;
