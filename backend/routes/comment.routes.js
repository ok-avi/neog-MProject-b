const express = require("express")
const router = express.Router()
const {createComment,getComments} = require("../controllers/comment.controller.js")


router.post('/v1/leads/:id/comments',createComment)
router.get('/v1/leads/:id/comments',getComments)

module.exports=router