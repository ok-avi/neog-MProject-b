const express = require("express");
const SalesAgent = require("../models/SalesAgent.model.js");

async function createSalesAgent(req, res) {
  try {
    if (
      !req.body.email.includes("@") ||
      !req.body.email.includes(".") ||
      req.body.email.indexOf(".") < req.body.email.indexOf("@")
    ) {
      res.status(400).json({
        error: "Invalid input: 'email' must be a valid email address.",
      });
      return;
    }  
    const duplicateAgent = await SalesAgent.findOne({ email: req.body.email });
    if (duplicateAgent) {
      res.status(409).json({
        error: `Sales agent with email '${req.body.email}' already exists.`
      });
      return;
    }
    const salesAgent = new SalesAgent(req.body);
    const savedData = await salesAgent.save();
    res
      .status(201)
      .json({ message: "Sales agent created", salesAgent: savedData });
  } catch (error) {
    console.error("Error while creating sales agent", error);
    res.status(500).json({ error: "Failed to create sales agent" });
  }
}

async function getSalesAgent(req, res) {
  try {
    const salesAgent = await SalesAgent.find();
    res.status(200).json(salesAgent);
  } catch (error) {
    console.error("Error while fetching sales agent data", error);
    res.status(500).json({ error: "Failed to fetch sales agent data" });
  }
}

module.exports = { createSalesAgent, getSalesAgent };
