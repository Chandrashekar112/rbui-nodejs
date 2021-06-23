const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const pool = require("./controllers/config");
// require("dotenv/config");
require("dotenv").config();

const app = express();



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server running Successfully");
  res.Header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.end();
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connected database");
});

const orderRouter = require("./routers/order");
const retailerRouter = require("./routers/retailer");
const supplierRouter = require('./routers/supplier');

app.use("/v1/api/order", orderRouter);
app.use("/v1/api/retailer", retailerRouter);
app.use("/v1/api/supplier", supplierRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "build", "index.html")); ///relative path
  });
}

app.listen(port, () => {
  console.log("Server running Successfully in the port", port);
});
