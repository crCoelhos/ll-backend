const express = require('express');
const router = express.Router();
const { createAppointment, getAllAppointments, deleteAppointment, updateAppointment, getAppointmentById } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/appointment/create', authMiddleware, createAppointment);
router.get('/appointment/:id', authMiddleware, getAppointmentById);
router.get('/appointment/all', authMiddleware, getAllAppointments);
router.put('/appointment/:id', authMiddleware, updateAppointment);
router.delete('/appointment/:id', authMiddleware, deleteAppointment);

module.exports = router;
