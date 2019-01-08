const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateInput(data) {
  let errors = {};

  data.studentid = !_.isEmpty(data.studentid) ? data.studentid : "";
  data.firstname = !_.isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !_.isEmpty(data.lastname) ? data.lastname : "";
  data.guardianname = !_.isEmpty(data.guardianname) ? data.guardianname : "";

  if (!Validator.isLength(data.studentid, { min: 5, max: 12 })) {
    errors.studentid = "Student ID must be between 5 and 12 characters";
  }

  if (Validator.isEmpty(data.studentid)) {
    errors.studentid = "Student ID field is required";
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

  if (!Validator.isLength(data.guardianname, { min: 5, max: 30 })) {
    errors.guardianname = "Guardian name must be between 5 and 30 characters";
  }

  if (Validator.isEmpty(data.guardianname)) {
    errors.guardianname = "Guardian name field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
