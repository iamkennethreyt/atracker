const express = require("express");
const passport = require("passport");

const router = express.Router();

//load validation
const validateInput = require("../../validations/sections/input");

//load User model
const Section = require("../../models/Section");

//@route    POST /api/sections
//@desc     Register new section
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

    Section.findOne({ name: req.body.name }).then(section => {
      errors.name = "Section ID is already exists";
      if (section) {
        return res.status(400).json(errors);
      } else {
        const newSection = new Section({
          name: req.body.name,
          yearlevel: req.body.yearlevel
        });

        newSection.save().then(section => res.json(section));
      }
    });
  }
);

//@route    GET api/sections/
//@desc     Show all sections
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Section.find()
      .then(sections => {
        if (!sections) {
          errors.noprofile = "There are no sections";
          return res.status(404).json(errors);
        }

        res.json(sections);
      })
      .catch(err => res.status(404).json({ profile: "There are no sections" }));
  }
);

//@route    DELETE api/section/:id
//@desc     Remove single section based on the params id
//@access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (req.user.usertype === "teacher") {
      return res
        .status(400)
        .json({ Unauthorized: "You are Unauthorized to Register new section" });
    }

    Section.findByIdAndRemove({ _id: req.params.id }).then(rmv =>
      res.json({
        success: true,
        message: `${rmv.name} has successfully removed`
      })
    );
  }
);

module.exports = router;
