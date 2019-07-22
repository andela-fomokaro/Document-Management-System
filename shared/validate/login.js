import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
   * Validate users input
   *
   * @param {string} data - information gotten from users
   * @return {object} isValid
   * @return {array} errors
   */
export const validateInput = (data) => {
  const errors = {};
  if (!validator.isEmail(data.identifier)) {
    errors.identifier = 'This field is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  return { errors, isValid: isEmpty(errors) };
};

export default validateInput;
