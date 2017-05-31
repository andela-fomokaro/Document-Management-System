/* eslint-disable global-require */
import express from 'express';
import validator from 'validator';

const router = express.Router();


const validateInput = (data) => {
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
};


router.post('/', (req, res) => {
  const validate = validateInput(req.body);
  return res.status(200).json(validate);
});

export default router;
