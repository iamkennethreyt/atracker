const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

//load APIs
const teachers = require("./routes/api/teachers");
const students = require("./routes/api/students");
const sections = require("./routes/api/sections");
const classsections = require("./routes/api/classsections");

const app = express();

app.use(cors());

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/key").mongoURI;

//connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Successfully connected to the database"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//use routes
app.use("/api/teachers", teachers);
app.use("/api/students", students);
app.use("/api/sections", sections);
app.use("/api/classsections", classsections);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
