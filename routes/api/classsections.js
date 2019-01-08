const express = require("express");
const passport = require("passport");
const _ = require("lodash");
const router = express.Router();

//load validation
const validateInput = require("../../validations/classsections/input");
//load User model
const ClassSection = require("../../models/ClassSection");
const Section = require("../../models/Section");
const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");

//@route    POST /api/classsections
//@desc     Register new classsection
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
      return res
        .status(400)
        .json({ Unauthorized: "You are Unauthorized to Register new section" });
    }

    //check if the section is existed
    Section.findOne({ _id: req.body.section })
      .then(() => {
        //check if the teacher is existed
        Teacher.findOne({ _id: req.body.teacher })
          .then(() => {
            //check if the section is existed
            ClassSection.findOne({
              unique: `${req.body.sy + req.body.section}`
            })
              .then(student => {
                errors.classsection =
                  "This section is already exist in the school year created";
                if (student) {
                  return res.status(400).json(errors);
                } else {
                  const newClassSection = new ClassSection({
                    teacher: req.body.teacher,
                    section: req.body.section,
                    sy: req.body.sy,
                    unique: `${req.body.sy + req.body.section}`
                  });

                  newClassSection.save().then(section => res.json(section));
                }
              })
              .catch(() => {
                return res.status(400).json(errors);
              });
          })
          .catch(() => {
            return res.status(400).json({ error: "Teacher id not found" });
          });
      })
      .catch(() => {
        return res.status(400).json({ error: "Section id not found" });
      });
  }
);

//@route    GET api/classsections/
//@desc     Show all classsections
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ClassSection.find()
      .populate("teacher")
      .populate("section")
      .populate("students.student")
      .then(sections => {
        res.json(sections);
      })
      .catch(err => res.status(404).json({ profile: "There are no sections" }));
  }
);

//@route    GET api/classsections/:id
//@desc     Show single student based on the params id
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    ClassSection.findOne({ _id: req.params.id })
      .populate("teacher")
      .populate("section")
      .populate("students.student")
      .then(student => {
        if (!student) {
          errors.noprofile = "There is no class for this params";
          res.status(404).json(errors);
        }

        res.json(student);
      })
      .catch(err =>
        res.status(404).json({ profile: "There is no class for this params" })
      );
  }
);

//@route    POST /api/classsections/register/:id
//@desc     Register new student in classsection
//@access   public
router.put(
  "/register/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.usertype === "teacher") {
      return res
        .status(400)
        .json({ error: "You are Unauthorized to Register new section" });
    }

    if (!req.body.student) {
      return res.status(400).json({ error: "Student field is required" });
    }

    Student.findOne({ _id: req.body.student })
      .then(() => {
        ClassSection.findOne({ _id: req.params.id }).then(classsection => {
          const filtered = classsection.students.filter(
            student => student.student == req.body.student
          );

          if (filtered.length > 0) {
            return res.status(400).json({
              error: "The student is already registered in the current class"
            });
          } else {
            const newStu = {
              student: req.body.student
            };
            classsection.students.unshift(newStu);
            classsection.save().then(classsection => res.json(classsection));
          }
        });
      })
      .catch(() => {
        return res.status(400).json({ classsection: "Student id not found" });
      });
  }
);

//@route    PUT /api/classsections/attendance/:classid/:studentid
//@desc     Check Attendance of the student
//@access   public
router.put(
  "/attendance/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.student) {
      return res.status(400).json({ error: "Student field is required" });
    }

    if (!req.body.date) {
      return res.status(400).json({ error: "Date field is required" });
    }

    ClassSection.findOne({ _id: req.params.id })
      .then(classsection => {
        const filterstudent = classsection.students.filter(
          students => students.student == req.body.student
        );

        if (filterstudent == 0) {
          return res.json({ error: "Student id not found" });
        } else {
          const filteredstudent = _.find(
            classsection.students,
            student => student.student._id == req.body.student
          );

          const filteredsattendance = filteredstudent.attendances.filter(
            att => att.date == req.body.date
          );

          if (filteredsattendance.length > 0) {
            res
              .status(400)
              .json({ error: "this student is homanag attendance" });
          } else {
            filteredstudent.attendances.unshift({ date: req.body.date });
            classsection
              .save()
              .then(success => res.json(success))
              .catch(err => res.status(400).json(err));
          }
        }
      })
      .catch(err => {
        if (err) throw err;
        res.json({ error: "Class section id not found" });
      });
  }
);

//@route    GET /api/classsections/attendance/:classid/:studentid
//@desc     Return attendance of the student
//@access   public
router.get(
  "/attendance/:classid/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ClassSection.findOne({ _id: req.params.classid })
      .then(classsection => {
        const filterstudent = classsection.students.filter(
          students => students.student == req.params.studentid
        );
        if (filterstudent == 0) {
          return res.json({ error: "Student id not found" });
        }

        ClassSection.findOne({ _id: req.params.classid })
          .populate("students.student")
          .then(classsection => {
            const filtered = _.find(
              classsection.students,
              student => student.student._id == req.params.studentid
            );

            res.json(filtered);
          });
      })
      .catch(() => {
        res.json({ error: "Class section id not found" });
      });
  }
);

module.exports = router;
