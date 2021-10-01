const express = require("express");
const main = require("./routes/index");
const users = require("./routes/users");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

// Passport config
require("./middleware/passport")(passport);

// Flash Message
const flash = require("connect-flash");
const session = require("express-session");

// Connect DB
mongoose
  .connect("mongodb://localhost:27017/alpha", { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

// EJS
app.set("view engine", "ejs");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "gwccracker",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", main);
app.use("/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
