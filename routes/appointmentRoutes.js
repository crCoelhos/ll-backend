const express = require('express');
const router = express.Router();
const { createAppointment, getAllAppointments, deleteAppointment, updateAppointment, getAppointmentById } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createAppointment);
router.get('/:id', authMiddleware, getAppointmentById);
router.get('/all', authMiddleware, getAllAppointments);
router.put('/:id', authMiddleware, updateAppointment);
router.delete('/:id', authMiddleware, deleteAppointment);

module.exports = router;
