/* eslint-disable no-unused-vars */
// const express = require('express');
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');
// const path = require('path');

// const compiler = webpack(webpackConfig);
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

// con 

// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true, publicPath: webpackConfig.output.publicPath
// }));
// app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const userRoute = require('./server/routes/UsersRoutes')(app);
const documentRoute = require('./server/routes/DocumentsRoutes')(app);
const RoleRoutes = require('./server/routes/RolesRoutes')(app);

app.use(express.static(path.join(__dirname, './client/public/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});


const server = app.listen(3000, () => {
  console.log('Hi I am running at 127.0.0.1:3000');
});

module.exports = server;
