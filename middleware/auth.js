module.exports = {
  ensureAuthentication: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_message", "Please login to review this resource");
    res.redirect("/users/login");
  },
};
