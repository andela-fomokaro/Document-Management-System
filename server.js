/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const userRoute = require('./server/routes/UsersRoutes')(app);
const documentRoute = require('./server/routes/DocumentsRoutes')(app);
const roleRoute = require('./server/routes/DocumentsRoutes')(app);


const server = app.listen(8000, () => {
  console.log('Hi I am running at 127.0.0.1:8000');
});
