const express = require('express');
const {requestPasswordReset, resetPassword } = require('../controllers/authController.js');

const router = express.Router();

router.post('/account/requestpassword', requestPasswordReset)
router.post('/account/resetpassword', requestPasswordReset)

module.exports = router;
