import Validator from 'validator';
import isEmpty from './is-empty';

const validateUserInput = (data) => {
  const errors = {};
  data.meal = !isEmpty(data.meal) ? data.meal : '';
  data.quantity = !isEmpty(data.quantity) ? data.quantity : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  if (Validator.isEmpty(data.meal)) {
    errors.meal = 'Meal field empty, please enter a meal';
  }
  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = 'Quantity field is empty, please enter an email';
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status Field is Required';
  }
  // if (Validator.isEmpty(data.user_role)) {
  //   errors.user_role = "User role is empty";
  // }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUserInput;
