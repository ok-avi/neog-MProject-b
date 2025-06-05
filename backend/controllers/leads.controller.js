const Lead = require("../models/Lead.model.js");
const SalesAgent = require("../models/SalesAgent.model.js");
const mongoose = require("mongoose");

async function createLead(req, res) {
  try {
    const { name, source, status, tags, timeToClose, priority, salesAgent } =
      req.body;
    // const requiredStringFields = []
    if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
      return res.status(400).json({
        error: `Sales agent ID '${salesAgent}' is not in correct format`,
      });
    }

    const salesAgentExist = await SalesAgent.findById(salesAgent);
    if (!salesAgentExist) {
      // console.log(salesAgentExist)
      return res
        .status(404)
        .json({ error: `Sales agent with ID '${salesAgent}' not found.` });
    }

    if (!name) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'name' is required." });
    }
    if (!source) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'source' is required." });
    }
    if (!status) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'status' is required." });
    }
    if (!priority) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'priority' is required." });
    }
    if (!timeToClose) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'timeToClose' is required." });
    }
    if (tags.length <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'tags' is required." });
    }

    const createNewLead = new Lead(req.body);
    const savedLead = await createNewLead.save();
    const leadsPopulatedData = await savedLead.populate(
      "salesAgent",
      "_id name"
    );
    res.status(201).json(leadsPopulatedData);
  } catch (error) {
    console.error("Error while creating lead", error);
    res.status(500).json({ error: "Failed to create lead" });
  }
}

async function getLeads(req, res) {
  try {
    const { salesAgent, status, tags, source } = req.query;

    if (Object.keys(req.query).length > 0) {
      // console.log(req.query)
      if (salesAgent) {
        if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
          return res.status(400).json({
            error: `Sales agent ID '${salesAgent}' is not in correct format`,
          });
        }
      }
    }

    if (
      status &&
      !["New", "Contacted", "Qualified", "Proposal Sent", "Closed"].includes(
        status
      )
    ) {
      return res.status(400).json({
        error: `Invalid input: 'status' must be one of ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'].`,
      });
    }

    if (
      source &&
      ![
        "Website",
        "Referral",
        "Cold Call",
        "Advertisement",
        "Email",
        "Other",
      ].includes(source)
    ) {
      return res.status(400).json({
        error: `Invalid input: 'status' must be one of ['Websit', 'Referral', 'Cold Call', 'Advertisement', 'Email','Other'].`,
      });
    }

    let filteredLeads;

    filteredLeads = await Lead.find().populate("salesAgent", "_id name");
    if (salesAgent) {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.salesAgent._id.toString() === salesAgent
      );
    }
    if (status) {
      filteredLeads = filteredLeads.filter((lead) => lead.status === status);
    }
    if (tags) {
      filteredLeads = filteredLeads.filter((lead) => lead.tags.includes(tags));
    }
    if (source) {
      filteredLeads = filteredLeads.filter((lead) => lead.source === source);
    }
    // const leads = Lead.findOne()
    // console.log(typeof salesAgent)
    res.status(200).json(filteredLeads);
  } catch (error) {
    console.error("Error while fetching leads", error);
    res.status(500).json({ error: "failed to fetch leads" });
  }
}

async function updateLead(req, res) {
  try {
    const { name, source, status, tags, timeToClose, priority, salesAgent } =
      req.body;
    if (!mongoose.Types.ObjectId.isValid(salesAgent._id)) {
      return res.status(400).json({
        error: `Sales agent ID '${salesAgent._id}' is not in correct format`,
      });
    }

    const salesAgentExist = await SalesAgent.findById(salesAgent._id);
    if (!salesAgentExist) {
      return res
        .status(404)
        .json({ error: `Sales agent with ID '${salesAgent._id}' not found.` });
    }

    if (!name) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'name' is required." });
    }
    if (!source) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'source' is required." });
    }
    if (!status) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'status' is required." });
    }
    if (!priority) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'priority' is required." });
    }
    if (!timeToClose) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'timeToClose' is required." });
    }
    // if (tags.length <= 0) {
    //   return res
    //     .status(400)
    //     .json({ error: "Invalid input: 'tags' is required." });
    // }

    const updateSalesAgentName = await SalesAgent.findByIdAndUpdate(
      salesAgent._id,
      { name: salesAgent.name }
    );

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("salesAgent", "_id name");
    res.status(200).json(updatedLead);
  } catch (error) {
    console.error("Error while updating lead", error);
    res.status(500).json({ error: "Failed to update lead" });
  }
}

async function deleteLead(req, res) {
  try {
    const deleteLeads = await Lead.findByIdAndDelete(req.params.id, {
      new: false,
    });
    if (!deleteLeads) {
      return res
        .status(400)
        .json({ error: `Lead with ID '${req.params.id}' not found.` });
    }
    // console.log(deleteLeads,req.params)
    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (error) {
    console.error("Error while deleting lead", error);
    res.json(500).json({ error: "Failed to delete lead" });
  }
}

async function getLeadById(req, res) {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "salesAgent",
      "_id name"
    );
    res.status(200).json(lead);
  } catch (error) {
    console.error("Error while fetching lead by id", error);
    res.json(500).json({ error: "Failed to get lead by id" });
  }
}

module.exports = { createLead, getLeads, updateLead, deleteLead, getLeadById };
