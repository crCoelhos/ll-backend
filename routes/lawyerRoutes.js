const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyerController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// teste
router.get('/lawyer/teste', (req, res) => {
    res.status(200).json({ message: 'lawyer teste' });
});

router.get('/lawyers/', authMiddleware, lawyerController.getAllLawyers);
router.post('/lawyer/create', lawyerController.createUser);

module.exports = router;
