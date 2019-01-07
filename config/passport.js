const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const Teacher = mongoose.model("teachers");

const key = require("./key").secretOrkey;

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      Teacher.findById(jwtPayload._id)
        .then(teacher => {
          if (teacher) {
            return done(null, teacher);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};
