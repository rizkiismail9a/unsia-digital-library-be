const express = require("express");
const authMiddleware = require("../../../middleware/auth");
const {
  getMyProfile,
  getAllUsers,
} = require("../../../controllers/user-controllers");
const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.get("/", authMiddleware, getAllUsers);

module.exports = router;
