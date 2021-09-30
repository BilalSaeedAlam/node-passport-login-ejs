const express = require("express");
const app = express();
const main = require("./routes/index");
const users = require("./routes/users");
const mongoose = require("mongoose");

// Connect DB
mongoose
  .connect("mongodb://localhost:27017/alpha", { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

// EJS
app.set("view engine", "ejs");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", main);
app.use("/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
