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
const RoleRoutes = require('./server/routes/RolesRoutes')(app);


// const routes = (router) => {
//   RoleRoutes(router);
// };

// export default routes;

const server = app.listen(3000, () => {
  console.log('Hi I am running at 127.0.0.1:3000');
});
