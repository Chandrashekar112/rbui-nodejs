const express = require("express");

const router = express.Router();

const {
  getRetailer,
  RetailerState,
  CreateRetailer,
} = require("../controllers/retailerController");

router.get("/", getRetailer);
// router.get("/company_ids", getCompanyId);
// router.get("/retailer_names", getRetailerName);
router.get("/retailer_state", RetailerState);
router.post("/addRetailer", CreateRetailer);

module.exports = router;
