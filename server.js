const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const index = require("./routes/index");
const users = require("./routes/users");

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Routes
app.use("/", index);
app.use("/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
