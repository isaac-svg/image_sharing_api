const ResponseError = require("../../middlewares/error");
const User = require("../../models/User");

const { StatusCodes } = require("http-status-codes");

async function register(req, res, next) {
  const { username, password: pass, email } = req.body;
  try {
    console.info(req.body);
    const newUser = new User({ username, password: pass, email });
    const savedUser = await newUser.save();
    const token = newUser.SignJwtToken();
    const { password, createdAt, updatedAt, ...others } = savedUser;
    res.status(StatusCodes.OK).cookie("token", token).json({
      savedUser,
      token,
      success: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      success: false,
    });
  }
}
module.exports = { register };
