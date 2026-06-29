require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const secretSign = process.env.JWT_SECRET;
  return jwt.sign(
    {
      sub: user.id,
    },
    secretSign,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    },
  );
};

module.exports = { generateTokens };
