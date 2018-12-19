const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/key").mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("successfully connected to the database"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

//use routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
