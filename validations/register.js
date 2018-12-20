const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "password must match";
  }

  if (!validator.isLength(data.password2, { min: 4, max: 40 })) {
    errors.password2 = "Confirm Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.isLength(data.password, { min: 4, max: 40 })) {
    errors.password = "Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.username, { min: 4, max: 40 })) {
    errors.username = "Username must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Username field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
