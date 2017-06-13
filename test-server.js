/* eslint-disable no-unused-vars */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import winston from 'winston';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const userRoute = require('./server/routes/UsersRoutes')(app);
const documentRoute = require('./server/routes/DocumentsRoutes')(app);
const RoleRoutes = require('./server/routes/RolesRoutes')(app);

const testServer = app.listen(7000, () => {
  winston.info('Hi I am running at 127.0.0.1:7000');
});

module.exports = testServer;
