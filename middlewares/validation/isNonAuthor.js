const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../error");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
async function isNonAuthor(req, res, next) {
  //   const { name, password, id, email } = req.body;
  const { imageAuthorId } = req.body;
  //   console.log("imageAuthorId: ", { imageAuthorId });
  if (imageAuthorId === req.user.id) {
    console.log("condition checked");
    // console.log(req.user);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "You can not vote on your own post",
    });
  } else {
    next();
  }
}

module.exports = isNonAuthor;
