const express = require("express");
const {
  getDashboardSummary,
} = require("../../../controllers/dashboard-controllers");
const router = express.Router();

router.get("/", getDashboardSummary);

module.exports = router;
