const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.student = !_.isEmpty(data.student) ? data.student : "";

  if (Validator.isEmpty(data.student)) {
    errors.student = "student field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
