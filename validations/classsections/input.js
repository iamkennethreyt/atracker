const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateInput(data) {
  let errors = {};

  data.section = !_.isEmpty(data.section) ? data.section : "";
  data.teacher = !_.isEmpty(data.teacher) ? data.teacher : "";
  data.sy = !_.isEmpty(data.sy) ? data.sy : "";

  if (Validator.isEmpty(data.section)) {
    errors.section = "Section field is required";
  }

  if (Validator.isEmpty(data.teacher)) {
    errors.teacher = "Teacher field is required";
  }

  if (Validator.isEmpty(data.sy)) {
    errors.sy = "School Year field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
