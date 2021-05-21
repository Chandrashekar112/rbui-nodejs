const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server running Successfully");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.end();
  // res.send("Hello, welcome to Node js Developement");
});

app.listen(port, () => {
  console.log("Server running Successfully in the port", port);
});
