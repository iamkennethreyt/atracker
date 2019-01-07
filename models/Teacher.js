const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const TeacherSchema = new Schema({
  teacherid: {
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
  usertype: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Teacher = mongoose.model("teachers", TeacherSchema);
