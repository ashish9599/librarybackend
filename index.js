const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "config/dot.env" });
const cors = require("cors");
const db = require("./config/db");
app.use(cors());
// app.use(bodyParser.raw({ type: 'application/json' }))
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('./assets'));
// app.use('/uploads',express.static('./books'));
app.use("/books", express.static("public/upload/books"));
app.use("/users", express.static("public/upload/users"));
app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/", require("./routes/home"));

// console.log(process.env.DB)
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Port  is running on the ${process.env.PORT}`);
  }
});
