/*
Route SUPPLIERS
*/
const express = require('express');
const { getSuppliers, getSupplier, postSupplier, putSupplier, deleteSupplier } = require('../controller/suppliers');
const router = express.Router();

router.get('/suppliers', getSuppliers);
router.get('/suppliers/:id_supplier', getSupplier);
router.post('/suppliers', postSupplier);
router.put('/suppliers/:id_supplier', putSupplier);
router.delete('/suppliers/:id_supplier', deleteSupplier);

module.exports = router;
