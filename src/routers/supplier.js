const express = require('express');

const router = express.Router();

const { getSupplier,updateSupplier,addSupplier,getUnmappedBrands,updateUnmappedBrands } = require('../controllers/supplierController');

router.get('/', getSupplier);
router.put('/:id', updateSupplier);
router.post('/', addSupplier);
router.get('/unmappedBrands', getUnmappedBrands);
router.post('/unmappedBrands', updateUnmappedBrands);


module.exports = router;
