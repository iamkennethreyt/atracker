const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.yearlevel = !_.isEmpty(data.yearlevel) ? data.yearlevel : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.yearlevel)) {
    errors.yearlevel = "Year Level field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
