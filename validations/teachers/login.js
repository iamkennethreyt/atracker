const validator = require("validator");
const _ = require("lodash");
// const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.teacherid = !_.isEmpty(data.teacherid) ? data.teacherid : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.teacherid)) {
    errors.teacherid = "Teacher ID field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
