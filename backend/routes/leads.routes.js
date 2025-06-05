const express = require("express");
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  getLeadById,
} = require("../controllers/leads.controller");
const router = express.Router();

router.post("/v1/leads", createLead);
router.get("/v1/leads", getLeads);
router.put("/v1/leads/:id", updateLead);
router.delete("/v1/leads/:id", deleteLead);

router.get("/v1/leads/:id",getLeadById);

module.exports = router;
