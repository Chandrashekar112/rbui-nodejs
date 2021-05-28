const express = require("express");

const router = express.Router();

const { getRetailer } = require("../controllers/retailerController");

router.get("/", getRetailer);
// router.get("/:company_id", filterRetailer);

module.exports = router;
