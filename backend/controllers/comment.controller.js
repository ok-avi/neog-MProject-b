const { mongoose } = require("mongoose");
const Comment = require("../models/Comment.model.js");
const Lead = require("../models/Lead.model.js");

async function createComment(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json(`Lead id '${req.params.id}' must be must be valid Object Id`);
    }
    if (!req.body.commentText) {
      return res.status(400).json("Write a comment message");
    }
    if (typeof req.body.commentText !== "string") {
      return res.status(400).json("Comment must be string");
    }

    const lead = await Lead.findById(req.params.id, "salesAgent");
    if (!lead) {
      return res.status(400).json(`Lead with id '${req.params.id}' not found.`);
    }

    const populatedLead = await lead.populate("salesAgent", "name");
    // console.log(populatedLead)
    const newComment = new Comment({
      lead: req.params.id,
      author: populatedLead.salesAgent._id,
      commentText: req.body.commentText,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error while creating comment", error);
    res.status(500).json("Failed to create comment");
  }
}

async function getComments(req, res) {
  try {
    const lead = await Comment.find({lead:req.params.id}).populate("author","name");
    res.status(200).json(lead);
  } catch (error) {
    console.error("Error while fetching comments", error);
    res.status(500).json({ error: "Failed to get comments" });
  }
}

module.exports = { createComment, getComments };
