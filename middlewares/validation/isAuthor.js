const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../error");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
async function isAuthor(req, res, next) {
  //   const { name, password, id, email } = req.body;
  const { authorId } = req.body;

  if (authorId !== req.user.id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Please make sure you are the author of the post",
    });
  }

  const user = await User.findOne({
    username: req.user.name,
    _id: req.user.id,
    email: req.user.email,
  });

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Please make sure you are the author of the post",
    });
  } else {
    next();
  }
}

module.exports = isAuthor;
