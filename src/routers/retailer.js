const express = require("express");

const router = express.Router();

const {
  getRetailer,
  getCompanyId,
  getRetailerName,
} = require("../controllers/retailerController");

router.get("/", getRetailer);
router.get("/company_ids", getCompanyId);
router.get("/retailer_names", getRetailerName);

module.exports = router;
