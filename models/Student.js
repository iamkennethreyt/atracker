const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const StudentSchema = new Schema({
  studentid: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  guardianname: {
    type: String,
    required: true
  },
  contactnumber: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
