const Joi = require("joi");

const registerScheme = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Konfirmasi password tidak cocok" }),
  role: Joi.string().valid("admin", "member").default("member"),
});

module.exports = { registerScheme };
