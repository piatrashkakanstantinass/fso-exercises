const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user && (await bcrypt.compare(password, user.passwordHash));

  if (!passwordCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
