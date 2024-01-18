const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');

// teste
router.get('/search-test/teste', (req, res) => {
    res.status(200).json({ message: 'search teste' });
});

router.get('/search/:searchString', searchController.multipleFieldLawyerSearch);



module.exports = router;

