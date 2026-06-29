const express = require("express");
const authLimiter = require("../../../middleware/rateLimiter");
const { requestValidator } = require("../../../middleware/validate");
const {
  registerScheme,
  loginScheme,
} = require("../../../validators/userValidator");
const { register, login } = require("../../../controllers/auth-controllers");
const router = express.Router();

router.post(
  "/register",
  authLimiter,
  requestValidator(registerScheme),
  register,
);

router.post("/login", authLimiter, requestValidator(loginScheme), login);

module.exports = router;
