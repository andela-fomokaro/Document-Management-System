/* eslint-disable no-unused-vars */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';


const app = express();
require('dotenv').config();

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler)
);
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const userRoute = require('./server/routes/UsersRoutes')(app);
const documentRoute = require('./server/routes/DocumentsRoutes')(app);
const RoleRoutes = require('./server/routes/RolesRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT;
console.log(port);

const server = app.listen(8000, () => {
  console.log('Hi I am running at 127.0.0.1:8000');
});

module.exports = server;
