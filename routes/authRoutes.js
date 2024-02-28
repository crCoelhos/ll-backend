const express = require('express');
const { signup, signin } = require('../controllers/authController.js');

const router = express.Router();

router.get('/auth/test', (req, res) => {
    res.send('legaliga auth api running');
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
