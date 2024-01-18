const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');
const lawyerController = require('../controllers/lawyerController.js');

// teste
router.get('/search-test/teste', (req, res) => {
    res.status(200).json({ message: 'search teste' });
});

router.get('/search/lawyer/:searchString', searchController.multipleFieldLawyerSearch);
router.get('/search/lawyer/', lawyerController.getAllLawyers);



module.exports = router;

