const express = require('express');

const router = express.Router();

const { getSupplier,getUnmappedBrands } = require('../controllers/supplierController');

router.get('/', getSupplier);
router.get('/unmappedBrands',getUnmappedBrands)

module.exports = router;
