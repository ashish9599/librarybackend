const mongoose = require("mongoose");

mongoose.connect(process.env.DB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to DB"));
db.once("open", function () {
  console.log("Successfully connected to DB");
});

module.exports = db;
