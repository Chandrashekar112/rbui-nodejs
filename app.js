const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./src/modules/pool");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server running Successfully");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.end();
});

// app.get("/retailer", (req, res) => {
pool.connect((err) => {
  if (err) throw err;
  console.log("connected database");
});
// });

// pool
//   .connect()
//   .then(() => console.log("database Connected"))
//   .catch((err) => console.log("Unable to connect to database"));

const orderRouter = require("./src/routers/order");
const retailerRouter = require("./src/routers/retailer");

app.use("/order", orderRouter);
app.use("/retailer", retailerRouter);

app.listen(port, () => {
  console.log("Server running Successfully in the port", port);
});
