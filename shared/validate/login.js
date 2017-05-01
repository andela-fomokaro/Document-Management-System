import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


function validateInput(data) {
  const errors = {};
  if (validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  return { errors, isValid: isEmpty(errors) };
}

export default validateInput;
