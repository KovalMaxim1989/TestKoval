const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../middlewares");
const {
  register,
  login,
  msg,
  logout,
} = require("../../controllers/authControllers");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../../schemas/authSchema");

router.post("/register", validateBody(createUserValidationSchema), register);

router.post("/login", validateBody(loginValidationSchema), login);

router.get("/protected", authenticate, msg);

router.post("/logout", authenticate, logout);

module.exports = router;
