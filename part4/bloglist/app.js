const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/blogs");
const config = require("./utils/config");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", notesRouter);

module.exports = app;
