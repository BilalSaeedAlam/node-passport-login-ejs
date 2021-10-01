const express = require("express");
const { serializeUser } = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Schema
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Register Page
router.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // check fields
  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please fill in all fields." });
  }

  // compare password
  if (password !== password2) {
    errors.push({ message: "Password not matched." });
  }

  // password length
  if (password.lenght < 6) {
    errors.push({ message: "Password should be at least 6 chracters." });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render("register", { errors, name, email, password, password2 });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ message: "Email is already registered" });
        res.render("register", { errors, name, email, password, password2 });
      } else {
        const user = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((user) => {
                req.flash(
                  "success_message",
                  "You are now registered and can login"
                );

                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_message", "You are logged out");
  res.redirect("/users/login");
});
module.exports = router;
