const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const pool = require("./modules/pool");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server running Successfully");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.end();
});

// app.get("/retailer", (req, res) => {
pool.connect((err) => {
  if (err) throw err;
  console.log("connected database");
});
// });

const orderRouter = require("./routers/order");
const retailerRouter = require("./routers/retailer");

app.use("/order", orderRouter);
app.use("/retailer", retailerRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "build", "index.html")); ///relative path
  });
}

app.listen(port, () => {
  console.log("Server running Successfully in the port", port);
});
