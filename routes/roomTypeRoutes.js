const express = require('express');
const router = express.Router();
const roomTypeController = require('../controllers/roomTypeController.js');

// teste
router.get('/roomType/teste', (req, res) => {
    res.status(200).json({ message: 'roomType teste' });
});

router.get('/roomTypes/', roomTypeController.getAllRoomTypes);
router.get('/roomType/:id', roomTypeController.getRoomTypeById);
router.post('/roomType/', roomTypeController.createRoomType);
router.put('/roomType/:id', roomTypeController.updateRoomTypeById);
router.delete('/roomType/:id', roomTypeController.deleteRoomTypeById);

module.exports = router;