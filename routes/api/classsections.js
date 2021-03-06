const express = require("express");
const passport = require("passport");
const _ = require("lodash");
const moment = require("moment");
const router = express.Router();

const Nexmo = require("nexmo");
const nexmo = new Nexmo({
  apiKey: "d467036f",
  apiSecret: "xR9O4Lh1VdJtidnO"
});

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
      const errors = {};
      errors.Unauthorized =
        "You are Unauthorized to modify the student profile";
      return res.status(400).json(errors);
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
                errors.section =
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
            errors.teacher = "Teacher ID not found";
            return res.status(400).json(errors);
          });
      })
      .catch(() => {
        errors.section = "Section ID not found";
        return res.status(400).json(errors);
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
    const errors = {};
    errors.sections;

    ClassSection.find()
      .populate("teacher")
      .populate("section")
      .populate("students.student")
      .then(sections => {
        res.json(sections);
      })
      .catch(err => res.status(404).json(errors));
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
    errors.noprofile = "There is no class for this params";
    ClassSection.findOne({ _id: req.params.id })
      .populate("teacher")
      .populate("section")
      .populate("students.student")
      .then(student => {
        if (!student) {
          res.status(404).json(errors);
        }

        res.json(student);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    GET api/classsections/teachers/current
//@desc     Show single classsections based on the current teacher
//@access   private
router.get(
  "/teachers/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There is no class for this params";
    ClassSection.find({ teacher: req.user.id })
      .populate("section")
      .populate("students.student")
      .then(student => {
        if (!student) {
          res.status(404).json(errors);
        }

        res.json(student);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    GET api/classsections/teacher
//@desc     Show the class section based of the current teacher user
//@access   private
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noclasses = "There is no classes available for this params";
    ClassSection.findOne({ teacher: req.user._id })
      .populate("section")
      .populate("students.student")
      .then(student => {
        if (!student) {
          res.status(404).json(errors);
        } else {
          res.json(student);
        }
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    POST /api/classsections/register/:id
//@desc     Register new student in classsection
//@access   public
router.put(
  "/register/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (req.user.usertype === "teacher") {
      errors.Unauthorized =
        "You are Unauthorized to modify the student profile";
      return res.status(400).json(errors);
    }

    if (!req.body.student) {
      errors.student = "Student ID is required";
      return res.status(400).json(errors);
    }

    Student.findOne({ _id: req.body.student })
      .then(foundStudent => {
        ClassSection.findOne({ _id: req.params.id }).then(classsection => {
          const filtered = classsection.students.filter(
            student => student.student == req.body.student
          );

          if (filtered.length > 0) {
            errors.student =
              "The student is already registered in the current class";
            return res.status(400).json(errors);
          } else {
            const newStu = {
              student: req.body.student,
              studentid: foundStudent.studentid
            };
            classsection.students.unshift(newStu);
            classsection.save().then(classsection => res.json(classsection));
          }
        });
      })
      .catch(() => {
        errors.student = "Student id not found";
        return res.status(400).json(errors);
      });
  }
);

//@route    PUT /api/classsections/attendance/:id
//@desc     Check Attendance of the student
//@access   public
router.put(
  "/attendance/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!req.body.student) {
      errors.error = "Student field is required";
      return res.status(400).json(errors);
    }

    ClassSection.findOne({ _id: req.params.id })
      .then(classsection => {
        const filterstudent = classsection.students.filter(
          students => students.studentid == req.body.student
        );

        if (filterstudent == 0) {
          errors.error = "This student was not register on this class";
          return res.status(400).json(errors);
        } else {
          const filteredstudent = _.find(
            classsection.students,
            student => student.studentid == req.body.student
          );

          const filteredsattendance = filteredstudent.attendances.filter(
            att => att.date == moment().format("LL")
          );

          if (filteredsattendance.length > 0) {
            errors.error = "This student is homanag attendance";
            return res.status(400).json(errors);
          } else {
            filteredstudent.attendances.unshift({
              date: moment().format("LL")
            });
            Student.findOne({ studentid: req.body.student }).then(student => {
              classsection
                .save()
                .then(() =>
                  res.json({
                    success: `You had successfully scanned ${
                      student.firstname
                    } ${student.lastname}`
                  })
                )
                .catch(err => res.status(400).json(err));
            });
          }
        }
      })
      .catch(err => {
        errors.error = "Class section id not found";
        if (err) throw err;
        res.json(errors);
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
    const errors = {};
    ClassSection.findOne({ _id: req.params.classid })
      .then(classsection => {
        const filterstudent = classsection.students.filter(
          students => students.student == req.params.studentid
        );
        if (filterstudent == 0) {
          errors.studentid = "Student id not found";
          return res.status(400).json(errors);
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
        errors.classsectionid = "Class section id not found";
        return res.json(errors);
      });
  }
);

//@route    GET /api/classsections/attendance/:classid/:studentid
//@desc     Return attendance of the student
//@access   public
router.get(
  "/sendsms/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findOne({ _id: req.params.id }).then(student => {
      // res.json(student);
      let number = student.contactnumber;
      number = number.slice(1);

      const sms = `Dear ${student.guardianname},
      Imong student nga si ${student.firstname}
      wa na'y uso niya ang klasehay

      pwede ka mo are office namo.
      
      Thank You

      `;

      if (!student.contactnumber) {
        res
          .status(400)
          .json({ error: "This student does not have a phone number" });
      } else {
        nexmo.message.sendSms("SWU-PHINMA", `63${number}`, sms);

        res.json({
          success: `successfully send sms to mr/mrs ${student.guardianname}`
        });
      }
    });
  }
);

module.exports = router;
