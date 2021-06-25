const express = require('express');

const router = express.Router();

const { getSupplier,updateSupplier,getUnmappedBrands } = require('../controllers/supplierController');

router.get('/', getSupplier);
router.put('/:id', updateSupplier);
router.get('/unmappedBrands', getUnmappedBrands);


module.exports = router;
