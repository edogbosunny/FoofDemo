import Validator from 'validator';
import isEmpty from './is-empty';

const validateUserInput = (data) => {
  const errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.user_role = !isEmpty(data.user_role) ? data.user_role : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field empty, please enter a username';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is empty, please enter an email';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email Format ';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password fielld must be at least 6 characters long';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password Field is Required';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Confirm password does not match password';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default validateUserInput;
