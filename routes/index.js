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
const notificationRoutes = require('./notificationRoutes');
const followRoutes = require('./followRoutes');


router.get('/v1/', (req, res) => {
    res.send('legaliga v1/api running');
});

router.use('/v1', authRoutes);
router.use('/v1', userRoutes);
router.use('/v1', lawyerRoutes);
router.use('/v1', appointmentRoutes);
router.use('/v1', appointmentStatusRoutes);
router.use('/v1', roleRoutes);
router.use('/v1', expertiseRoutes);
router.use('/v1', addressRoutes);
router.use('/v1', workspaceTypeRoutes);
router.use('/v1', workspaceRoutes);
router.use('/v1', searchRoutes);
router.use('/v1', processRoutes);
router.use('/v1', notificationRoutes);
router.use('/v1', followRoutes);
router.use('/v1', comunicationRoutes);
// router.use('/v1',comunicationRoutes);
router.use('/v1', accountRoutes);

module.exports = router;