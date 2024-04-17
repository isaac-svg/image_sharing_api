const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");

async function login(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    if (!username || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Please provide username and password",
        success: false,
      });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "username or password incorrect", success: false });
    }
    const isMatch = await user.isPasswordMatch(password);
    console.log(isMatch);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "username or passwprd incorrect" });
    }
    const token = user.SignJwtToken();

    const payload = {
      email: user["email"],
      username: user["username"],
      createdAt: user["createdAt"],
      _id: user["_id"],
      isAuthenticated: true,
    };
    console.log(token);
    return res
      .cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .status(200)
      .json({ success: true, message: "ok", payload });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: error.message, success: false });
  }
}

module.exports = { login };
