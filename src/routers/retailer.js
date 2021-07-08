const express = require("express");

const router = express.Router();

const {
  getRetailer,
  RetailerState,
  CreateRetailer,
  UpdateRetailer,
} = require("../controllers/retailerController");

router.get("/", getRetailer);
router.get("/retailer_state", RetailerState);
router.post("/addRetailer", CreateRetailer);
router.put("/:id", UpdateRetailer);

module.exports = router;
