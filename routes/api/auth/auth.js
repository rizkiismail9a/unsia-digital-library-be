const express = require("express");
const authLimiter = require("../../../middleware/rateLimiter");
const { requestValidator } = require("../../../middleware/validate");
const registerScheme = require("../../../validators/userValidator");
const { register } = require("../../../controllers/auth-controllers");
const router = express.Router();

router.post(
  "/register",
  authLimiter,
  requestValidator(registerScheme),
  register,
);

module.exports = router;
