const bcrypt = require("bcrypt");
const User = require("../models/client");
const { HttpError } = require("../utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const registerService = async (body) => {
  const { name, password } = body;
  const user = await User.findOne({ name });
  if (user) {
    throw new HttpError(409, "Name alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...body, password: hashPassword });
  return newUser;
};

const loginService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user,
  };
};

const logoutService = async (user) => {
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { token: "" });

  return id;
};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
