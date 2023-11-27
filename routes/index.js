const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const addressRoutes = require('./addressRoutes');
const authRoutes = require('./authRoutes')
const appointmentRoutes = require('./appointmentRoutes')
const workspaceRoutes = require('./workspaceRoutes')
const workspaceTypeRoutes = require('./workspaceTypeRoutes')

router.use('/v1', authRoutes, authRoutes)
router.use('/v1', authRoutes, userRoutes);
router.use('/v1', authRoutes, appointmentRoutes);
router.use('/v1', authRoutes, roleRoutes);
router.use('/v1', authRoutes, expertiseRoutes);
router.use('/v1', authRoutes, addressRoutes);
router.use('/v1', authRoutes, workspaceTypeRoutes);
router.use('/v1', authRoutes, workspaceRoutes);

module.exports = router;