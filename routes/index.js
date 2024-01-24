const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const lawyerRoutes = require('./lawyerRoutes');
const roleRoutes = require('./roleRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const addressRoutes = require('./addressRoutes');
const authRoutes = require('./authRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const appointmentStatusRoutes = require('./appointmentStatusRoutes');
const workspaceRoutes = require('./workspaceRoutes');
const searchRoutes = require('./searchRoutes');
const workspaceTypeRoutes = require('./workspaceTypeRoutes');
const accountRoutes = require('./accountRoutes');
const comunicationRoutes = require('./comunicationRoutes');
const processRoutes = require('./processRoutes');

router.use('/v1', authRoutes, authRoutes);
router.use('/v1', authRoutes, userRoutes);
router.use('/v1', authRoutes, lawyerRoutes);
router.use('/v1', authRoutes, appointmentRoutes);
router.use('/v1', authRoutes, appointmentStatusRoutes);
router.use('/v1', authRoutes, roleRoutes);
router.use('/v1', authRoutes, expertiseRoutes);
router.use('/v1', authRoutes, addressRoutes);
router.use('/v1', authRoutes, workspaceTypeRoutes);
router.use('/v1', authRoutes, workspaceRoutes);
router.use('/v1', authRoutes, searchRoutes);
router.use('/v1', authRoutes, processRoutes);
router.use('/v1', comunicationRoutes);
// router.use('/v1', authRoutes, comunicationRoutes);
router.use('/v1', accountRoutes);

module.exports = router;