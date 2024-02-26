const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController.js');
const dailyWatchController = require('../controllers/dailyWatch.controller.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// teste
router.get('/lawyer/teste', (req, res) => {
    res.status(200).json({ message: 'lawyer teste' });
});

router.post('/lawyer-process/watch', authMiddleware, processController.insertProcess);
router.get('/lawyer-process/all', authMiddleware, processController.getAllProcesses);
router.get('/user-processes/all', authMiddleware, processController.getAllUserProcesses);


router.get('/lawyer-process/processes', authMiddleware, dailyWatchController.scrapeAndSaveApiResponses);
router.get('/lawyer-process/responses', authMiddleware, dailyWatchController.getAllApiResponses);

module.exports = router;
