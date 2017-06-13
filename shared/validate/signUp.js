import validator from 'validator';
/**
 *
 * validates user inputs
 * @param {string} data
 * @returns {object}
 */
function validateInput(data) {
  const errors = {};
  if (validator.isEmpty(data.password) || data.password.length < 5) {
    errors.password = 'Password should contain more than 5 characters';
  }

  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

export default validateInput;
