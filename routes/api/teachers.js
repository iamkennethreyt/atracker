const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const key = require("../../config/key").secretOrkey;

//load validation
const ValidateRegisterInput = require("../../validations/teachers/register");
const ValidateLoginInput = require("../../validations/teachers/login");
const ValidateChangePasswordInput = require("../../validations/teachers/changepassword");

//load User model
const Teacher = require("../../models/Teacher");

router.get("/test/sample", (req, res) => {
  res.json({ hello: "successfully connected to database" });
});

//@route    POST api/users/login
//@desc     login user and returns JWT web token
//@access   public
router.post("/login", (req, res) => {
  const teacherid = req.body.teacherid;
  const password = req.body.password;

  const { errors, isValid } = ValidateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User by Email
  Teacher.findOne({ teacherid }).then(teacher => {
    //check user
    if (!teacher) {
      errors.teacherid = "Teacher ID not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, teacher.password).then(isMatch => {
      //user  matched
      if (isMatch) {
        // create JWT payload
        const payload = {
          _id: teacher._id,
          id: teacher.teacherid,
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          usertype: teacher.usertype
        };

        //sign token
        jwt.sign(payload, key, (err, token) => {
          res.json({
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    POST /api/tearchers
//@desc     Register new teacher
//@access   public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateRegisterInput(req.body);

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

    Teacher.findOne({ teacherid: req.body.teacherid }).then(teacher => {
      errors.teachearid = "Teacher Id is already exists";
      if (teacher) {
        return res.status(400).json(errors);
      } else {
        const newTeacher = new Teacher({
          teacherid: req.body.teacherid,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          middlename: req.body.middlename,
          usertype: "teacher",
          password: req.body.teacherid
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newTeacher.password, salt, (err, hash) => {
            if (err) throw err;
            newTeacher.password = hash;
            newTeacher
              .save()
              .then(teacher => res.json(teacher))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

//@route    GET api/users/current
//@desc     return current user
//@access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

//@route    PUT api/teachers/changepassword/:id
//@desc     account settings change password
//@access   private
router.put(
  "/accountsettings/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateChangePasswordInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //check password
    bcrypt.compare(req.body.password, req.user.password).then(isMatch => {
      if (isMatch) {
        Teacher.findById(req.user.id, (err, user) => {
          if (err) throw err;

          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            bcrypt.hash(req.body.password3, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        });
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  }
);

//@route    GET api/teachers/
//@desc     Show all registered teachers
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There are no teachers";
    Teacher.find()
      .then(teachers => {
        if (!teachers) {
          return res.status(404).json(errors);
        }

        res.json(teachers);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    GET api/teachers/:id
//@desc     Show single teacher based on the params id
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    errors.noprofile = "There is no profile for this user";
    Teacher.findOne({ _id: req.params.id })
      .then(teacher => {
        if (!teacher) {
          res.status(404).json(errors);
        }

        res.json(teacher);
      })
      .catch(err => res.status(404).json(errors));
  }
);

//@route    PUT api/teachers/:id
//@desc     Modify single teacher based on the params id
//@access   private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const profileFields = {};
    if (req.user.usertype === "admin" || req.user.id === req.params.id) {
      if (req.body.firstname) profileFields.firstname = req.body.firstname;
      if (req.body.lastname) profileFields.lastname = req.body.lastname;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.middlename) profileFields.middlename = req.body.middlename;

      Teacher.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true }
      )
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json({ error: err }));
    } else {
      errors.Unauthorized =
        "You are Unauthorized to modify the teacher profile";
      return res.status(400).json(errors);
    }
  }
);

module.exports = router;

//HELLO VINCE
//firmo
