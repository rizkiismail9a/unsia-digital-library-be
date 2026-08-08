const express = require("express");
const router = express.Router();
const authMiddleware = require("../../../middleware/auth");
const {
  getLoans,
  createLoan,
  returnLoan,
  getMyLoans,
} = require("../../../controllers/loan-controllers");

router.get("/", authMiddleware, getLoans);
router.get("/my-loans", authMiddleware, getMyLoans);
router.post("/create", authMiddleware, createLoan);
router.put("/:id/return", authMiddleware, returnLoan);

module.exports = router;
