const express = require("express");
const app = express();
const cors = require("cors");
const errorsRoute = require("./routes/errorRoutes");
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

app.use(upload.array());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB

app.use("/", errorsRoute);

app.listen(8080, () => {
  console.log(`Server is running on port `);
});
