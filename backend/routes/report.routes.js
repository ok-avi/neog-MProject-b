const express = require("express");
const {
  getLastWeekReports,
  getLeadsExceptsClosed,
} = require("../controllers/report.controller.js");
const router = express.Router();

router.get("/v1/report/last-week", getLastWeekReports);
router.get("/v1/report/pipeline", getLeadsExceptsClosed);

module.exports = router;
