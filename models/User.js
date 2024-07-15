const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      required: [true, "Please provide username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      minlength: 4,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  if (!this.username || !this.password || !this.email) {
    return next(
      new ResponseError("please provide all fields", StatusCodes.BAD_REQUEST)
    );
  }
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});
UserSchema.methods.VerifyJwtToken = function (token, jwtOptions = {}) {
  return jwt.verify(token, process.env.JWT_SECRET, jwtOptions);
};

UserSchema.methods.SignJwtToken = function () {
  return jwt.sign(
    { id: this._id, name: this.username, email: this.email },
    process.env.JWT_SECRET,
    {}
  );
};
UserSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
