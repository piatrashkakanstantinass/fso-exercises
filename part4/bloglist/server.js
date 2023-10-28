const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/blogs");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", notesRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
