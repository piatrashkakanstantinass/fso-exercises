const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", require("./controllers/blogs"));
app.use("/api/users", require("./controllers/users"));
app.use("/api/login", require("./controllers/login"));

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", require("./controllers/testing"));
}

app.use(middleware.errorHandler);

module.exports = app;
