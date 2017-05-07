/* eslint-disable global-require */
import express from 'express';
import validator from 'validator';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';

// const app = express();
const router = express.Router();

function validateInput(data) {
  const errors = {};
  if (validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(data.fullNames)) {
    errors.firstname = 'This field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}
// app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

// const userRoute = require('../routes/UsersRoutes')(app);
// const documentRoute = require('../routes/DocumentsRoutes')(app);
// const RoleRoutes = require('../routes/RolesRoutes')(app);


router.post('/', (req, res) => {
  const validate = validateInput(req.body);
  return res.status(200).json(validate);
});


// const server = app.listen(4000, () => {
//   console.log('Listening on port 4000');
// });

// module.exports = server;
export default router;
