const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyerController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// teste
router.get('/lawyer/teste', (req, res) => {
    res.status(200).json({ message: 'lawyer teste' });
});

router.post('/lawyer/create', lawyerController.createUser);
router.get('/lawyer/all', lawyerController.getAllLawyers);
router.get('/lawyer-user/:id', lawyerController.getLawyerByUserId);
router.get('/lawyer/:id', lawyerController.getLawyerById);
router.get('/lawyer-expertise/:id', lawyerController.getAllLawyersByExpertise);
router.get('/lawyer-state/:UF', lawyerController.getAllLawyersByState);

module.exports = router;
