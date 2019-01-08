const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClassSectionSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "teachers"
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: "sections"
  },
  sy: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  unique: {
    type: String,
    required: true
  },
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "students"
      },
      attendances: [
        {
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ClassSection = mongoose.model(
  "classsections",
  ClassSectionSchema
);
