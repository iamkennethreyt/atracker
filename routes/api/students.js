const express = require("express");
const passport = require("passport");

const router = express.Router();

//load validation
const validateInput = require("../../validations/students/input");

//load User model
const Student = require("../../models/Student");

//@route    POST /api/students
//@desc     Register new student
//@access   public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.user.usertype === "teacher") {
      errors.Unauthorized = "You are Unauthorized to Register new student";
      return res.status(400).json(errors);
    }

    Student.findOne({ studentid: req.body.studentid }).then(student => {
      errors.studentid = "Student ID is already exists";
      if (student) {
        return res.status(400).json(errors);
      } else {
        const newStudent = new Student({
          studentid: req.body.studentid,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          middlename: req.body.middlename,
          guardianname: req.body.guardianname,
          contactnumber: req.body.contactnumber
        });

        newStudent.save().then(student => res.json(student));
      }
    });
  }
);

//@route    GET api/students/
//@desc     Show all teacher based on the params id
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There are no students";
    Student.find()
      .then(students => {
        if (!students) {
          return res.status(404).json(errors);
        }

        res.json(students);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    GET api/students/:id
//@desc     Show single student based on the params id
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There is no profile for this student";
    Student.findOne({ _id: req.params.id })
      .then(student => {
        if (!student) {
          res.status(404).json(errors);
        }

        res.json(student);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    PUT api/students/:id
//@desc     Modify single student based on the params id
//@access   private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const studentProfileFields = {};
    if (req.user.usertype === "admin") {
      if (req.body.firstname)
        studentProfileFields.firstname = req.body.firstname;
      if (req.body.lastname) studentProfileFields.lastname = req.body.lastname;
      if (req.body.middlename)
        studentProfileFields.middlename = req.body.middlename;

      if (req.body.status) studentProfileFields.status = req.body.status;
      if (req.body.guardianname)
        studentProfileFields.guardianname = req.body.guardianname;
      if (req.body.contactnumber)
        studentProfileFields.contactnumber = req.body.contactnumber;

      Student.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: studentProfileFields },
        { new: true }
      )
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json({ errors: err }));
    } else {
      errors.Unauthorized =
        "You are Unauthorized to modify the student profile";
      return res.status(400).json(errors);
    }
  }
);

module.exports = router;
