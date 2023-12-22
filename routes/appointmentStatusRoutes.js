const express = require('express');
const router = express.Router();
const appointmentStatusController = require('../controllers/appointmentStatusController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');

// teste
router.get('/appointment-status/teste', (req, res) => {
    res.status(200).json({ message: 'appointmentStatus teste' });
});

router.post('/appointment-status/create', authMiddleware, appointmentStatusController.createAppointmentStatus);
router.get('/appointment-status/:id', authMiddleware, appointmentStatusController.getAppointmentStatusById);
router.get('/appointment-statuses/all', authMiddleware, appointmentStatusController.getAllAppointmentStatuses);
router.put('/appointment-status', authMiddleware, appointmentStatusController.updateAppointmentStatus);
router.delete('/appointment-status/:id', authMiddleware, appointmentStatusController.deleteAppointmentStatus);

module.exports = router;
