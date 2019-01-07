const express = require("express");
const passport = require("passport");

const router = express.Router();

//load validation
const validateInput = require("../../validations/classsections/input");
const validateRegisterInput = require("../../validations/classsections/registerstudent");
//load User model
const ClassSection = require("../../models/ClassSection");

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

    ClassSection.findOne({ unique: `${req.body.sy + req.body.section}` }).then(
      student => {
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
      }
    );
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

//@route    POST /api/classsections
//@desc     Register new classsection
//@access   public
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.user.usertype === "teacher") {
      return res
        .status(400)
        .json({ Unauthorized: "You are Unauthorized to Register new section" });
    }

    ClassSection.findOne({ _id: req.params.id }).then(classsection => {
      const newStu = {
        student: req.body.student
      };
      classsection.students.unshift(newStu);
      classsection.save().then(classsection => res.json(classsection));
    });
  }
);

module.exports = router;
