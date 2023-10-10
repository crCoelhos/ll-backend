const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');

router.use('/v1', userRoutes);
router.use('/v1', roleRoutes);

module.exports = router;