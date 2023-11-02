const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  request.token = authorization && authorization.match(/Bearer (.+)/)[1];
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: "user not found" });
  }
  request.user = user;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
