const express = require('express');
const router = express.Router();
const comunicationController = require('../controllers/scraperComunicationController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');



router.get('/api/dados/:keyword', comunicationController.scraper);
// router.get('/api/dados/:keyword', authMiddleware, comunicationController.scraper);


module.exports = router;
