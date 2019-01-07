const validator = require("validator");
const _ = require("lodash");

module.exports = function validateChangePasswordInput(data) {
  let errors = {};

  data.password = !_.isEmpty(data.password) ? data.password : "";
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : "";
  data.password3 = !_.isEmpty(data.password3) ? data.password3 : "";

  if (!validator.equals(data.password2, data.password3)) {
    errors.password3 = "Confirm password must match";
  }

  if (!validator.isLength(data.password2, { min: 4, max: 40 })) {
    errors.password2 = "New Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "New Password field is required";
  }

  if (!validator.isLength(data.password2, { min: 4, max: 40 })) {
    errors.password3 = "Confirm Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password3 = "Confirm Password field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Current password field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
