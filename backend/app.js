const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const parkingRouter = require("./routes/parking");

// database
const db = require("./config/db");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("./assets", express.static("assets"));

// router
app.use(parkingRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
