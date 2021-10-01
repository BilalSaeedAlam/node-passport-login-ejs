const express = require("express");
const router = express.Router();
const { ensureAuthentication } = require("../middleware/auth");

// Welcome Page
router.get("/", (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthentication, (req, res) =>
  res.render("dashboard", {
    name: req.user.name,
  })
);

module.exports = router;
