const express = require('express');
const router = express.Router();

const userRoute = require('./userRoutes');

router.use('/v1', userRoute);

module.exports = router;