const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const addressRoutes = require('./addressRoutes');
const authRoutes = require('./authRoutes')
const appointmentRoutes = require('./appointmentRoutes')

router.use('/v1', authRoutes, userRoutes);
router.use('/v1', authRoutes, appointmentRoutes);
router.use('/v1', authRoutes, roleRoutes);
router.use('/v1', authRoutes, expertiseRoutes);
router.use('/v1', authRoutes, addressRoutes);
router.use('/v1', authRoutes, authRoutes)

module.exports = router;