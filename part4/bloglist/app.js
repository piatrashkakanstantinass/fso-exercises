const express = require("express");
const cors = require("cors");
const notesRouter = require("./controllers/blogs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", notesRouter);

module.exports = app;
