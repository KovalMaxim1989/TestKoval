const { controllerWrapper } = require("../utils");
const {
  registerService,
  loginService,
  logoutService,
} = require("../services/authServices");

const register = controllerWrapper(async (req, res) => {
  const user = await registerService(req.body);
  res.status(201).json({
    user: {
      name: user.name,
    },
  });
});

const login = controllerWrapper(async (req, res) => {
  const result = await loginService(req.body);
  res.status(200).json({
    token: result,
    user: {
      name: req.body.name,
    },
  });
});

const logout = controllerWrapper(async (req, res) => {
  await logoutService(req.user);

  res.status(204).end();
});

const msg = controllerWrapper(async (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

module.exports = {
  register,
  login,
  msg,
  logout,
};
