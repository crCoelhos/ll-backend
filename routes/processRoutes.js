const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// teste
router.get('/user/teste', (req, res) => {
    res.status(200).json({ message: 'user teste' });
});

router.post('/lawyer-process/watch', authMiddleware, processController.insertProcess);
router.get('/lawyer-process/all', authMiddleware, processController.getAllProcesses);

module.exports = router;
