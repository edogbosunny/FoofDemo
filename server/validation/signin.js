import Validator from 'validator';
import isEmpty from './is-empty';

const validateUserInput = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email Format';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is empty, please enter an email';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password fielld must be at least 6 chaaracters long';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  //   if (Validator.isEmpty(data.user_role)) {
  //     errors.user_role = 'User role is empty';
  //   }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUserInput;
