const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const SectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  yearlevel: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Seksyon = mongoose.model("sections", SectionSchema);
