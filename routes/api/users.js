const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const key = require("../../config/key").secretkey;

//load User model
const User = require("../../models/User");

//@route    POST api/users/register
//@desc     register new user
//@access   public
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUSer = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
          if (err) throw err;
          newUSer.password = hash;
          newUSer
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/login
//@desc     login user and returning  JWT web token
//@access   public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Find User by Email
  User.findOne({ username }).then(user => {
    //chech user
    if (!user) {
      return res.status(404).json({ username: "User name not found" });
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user  matched

        //create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          username: user.username
        };

        //sign token
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          res.json({
            token
          });
        });
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

module.exports = router;
