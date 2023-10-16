const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const addressRoutes = require('./addressRoutes');
const authRoutes = require('./authRoutes')

router.use('/v1', userRoutes);
router.use('/v1', roleRoutes);
router.use('/v1', expertiseRoutes);
router.use('/v1', addressRoutes);
router.use('/v1', authRoutes)

module.exports = router;