const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (typeof password !== "string") {
    let e = new Error("Wrong password type (expected string)");
    e.name = "ValidationError";
    throw e;
  }
  if (password.length < 3) {
    let e = new Error("Password must be at least 3 symbols long");
    e.name = "ValidationError";
    throw e;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(await savedUser.populate("blogs"));
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = usersRouter;
