const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/appointment/create', authMiddleware, appointmentController.createAppointment);
router.get('/appointment/:id', authMiddleware, appointmentController.getAppointmentById);
router.get('/appointments/public', authMiddleware, appointmentController.getAllPublicAppointments);
router.get('/appointments/all', authMiddleware, appointmentController.getAllAppointments);
router.put('/appointment/:id', authMiddleware, appointmentController.updateAppointment);
router.delete('/appointment/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
