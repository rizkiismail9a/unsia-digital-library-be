const express = require("express");
const router = express.Router();
const authMiddleware = require("../../../middleware/auth");
const {
  getMembers,
  getMemberById,
  createMember,
} = require("../../../controllers/member-controllers");
const authLimiter = require("../../../middleware/rateLimiter");
const { requestValidator } = require("../../../middleware/validate");
const { createMemberSchema } = require("../../../validators/memberValidator");

router.get("/", authMiddleware, getMembers);
router.get("/:id", authMiddleware, getMemberById);

router.post(
  "/create",
  authLimiter,
  authMiddleware,
  requestValidator(createMemberSchema),
  createMember,
);

module.exports = router;
