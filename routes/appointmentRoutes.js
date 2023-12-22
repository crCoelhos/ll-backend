const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

const authMiddleware = require('../middlewares/authMiddleware');

// teste
router.get('/appointment/teste', (req, res) => {
    res.status(200).json({ message: 'appointment teste' });
});

router.post('/appointment/create', authMiddleware, appointmentController.createAppointment);
router.get('/appointment/:id', authMiddleware, appointmentController.getAppointmentById);
router.get('/workspace-appointment/:workspaceId', authMiddleware, appointmentController.getAllAppointmentsByWorkspaceId);
router.get('/workspace-appointment/:workspaceId/:appointmentDate', authMiddleware, appointmentController.getAppointmentByWorkspaceIdAndDate);
router.get('/appointments/public', authMiddleware, appointmentController.getAllPublicAppointments);
router.get('/appointments/all', authMiddleware, appointmentController.getAllAppointments);
router.put('/appointment/:id', authMiddleware, appointmentController.updateAppointment);
router.put('/appointment-status/:id', authMiddleware, appointmentController.updateAppointmentStatus);
router.put('/appointment-status', authMiddleware, appointmentController.updateAppointmentStatus);
router.delete('/appointment/:id', authMiddleware, appointmentController.deleteAppointment);
router.put('/cancel-appointment/:id', authMiddleware, appointmentController.cancelAppointment);
router.put('/confirm-appointment/:id', authMiddleware, appointmentController.confirmAppointment);
router.put('/postpone-appointment/:id', authMiddleware, appointmentController.postponeAppointment);

module.exports = router;
