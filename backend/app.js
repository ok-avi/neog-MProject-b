const express = require("express");
const app = express();
const leadRouter = require("./routes/leads.routes.js");
const salesAgentRouter = require("./routes/salesagent.routes.js");
const commentRouter = require("./routes/comment.routes.js");
const reportRouter = require("./routes/report.routes.js");
const cors = require('cors')

app.use(cors())

app.get("/", (req, res) => {
  res.send("running express apps");
});

app.use(express.json());

app.use("/api", leadRouter);
app.use("/api", salesAgentRouter);
app.use("/api", commentRouter);
app.use("/api", reportRouter);

module.exports = app;
