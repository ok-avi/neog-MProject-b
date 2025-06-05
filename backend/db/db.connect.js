const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

const dbConnection = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error while connecting  database", error));
};

module.exports = { dbConnection };
