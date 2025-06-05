const LeadModel = require("../models/Lead.model");


async function getLastWeekReports(req, res) { // check again after writing from and writting the value closedAt
  try {
    // console.log("working");
    const sevenDaysAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const last7daysLeads = await LeadModel.find({ status: "Closed", closedAt:{$lt:"High"} });
    res.status(200).json(last7daysLeads);
  } catch (error) {
    console.error("Error while fetching last week report", error);
    res.status(500).json({ error: "Failed to get the last week report" });
  }
}

async function getLeadsExceptsClosed(req, res) {
  try {
    const totalNoOfLeadExceptClosed = (await LeadModel.find({status:{$ne: "Closed"}})).length
    res.status(200).json({totalLeadsInPipeline:totalNoOfLeadExceptClosed})
  } catch (error) {
    console.error("Error while fetching leads excepts Closed status", error);
    res.status(500).json({ error: "Failed to get the leads excepts Closed status" });
  }
}

module.exports = { getLastWeekReports,getLeadsExceptsClosed };
