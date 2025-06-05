const express = require("express");
const router = express.Router();
const {
  createSalesAgent,
  getSalesAgent,
} = require("../controllers/salesagent.controller.js");

router.post("/v1/agents", createSalesAgent);

router.get("/v1/agents", getSalesAgent);

module.exports = router;
