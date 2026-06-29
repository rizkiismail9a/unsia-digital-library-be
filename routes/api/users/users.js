const express = require("express");
const authMiddleware = require("../../../middleware/auth");
const { getMyProfile } = require("../../../controllers/user-controllers");
const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);

module.exports = router;
