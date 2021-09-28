const express = require("express");
const app = express();
const index = require("./routes/index");

app.use("/", index);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
