import validator from 'validator';


function validateInput(data) {
  const errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password) || data.password.length < 5) {
    errors.password = 'Password length too short';
  }

  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

export default validateInput;
