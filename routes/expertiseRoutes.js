const express = require('express');
const router = express.Router();
const expertiseController = require('../controllers/expertiseController.js');

// teste
router.get('/expertise/teste', (req, res) => {
    res.status(200).json({ message: 'expertise teste' });
});

router.post('/expertise/create', expertiseController.createExpertise);
router.get('/expertises/', expertiseController.getAllExpertises);
router.get('/expertise/:id', expertiseController.getExpertiseById);
router.put('/expertise/:id', expertiseController.updateExpertiseById);
router.delete('/expertise/:id', expertiseController.deleteExpertiseById);

module.exports = router;
