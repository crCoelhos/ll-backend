const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController.js');

router.post('/address/', addressController.createAddress);
router.get('/addresses/', addressController.getAllAddresss);
router.get('/address/:id', addressController.getAddressById);
router.put('/address/:id', addressController.updateAddressById);
router.delete('/address/:id', addressController.deleteAddressById);

module.exports = router;
