const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.teacherid = !_.isEmpty(data.teacherid) ? data.teacherid : "";
  data.firstname = !_.isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !_.isEmpty(data.lastname) ? data.lastname : "";

  if (!Validator.isLength(data.teacherid, { min: 5, max: 12 })) {
    errors.teacherid = "Teacher ID must be between 5 and 12 characters";
  }

  if (Validator.isEmpty(data.teacherid)) {
    errors.teacherid = "Teacher ID field is required";
  }

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "First name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Last name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
