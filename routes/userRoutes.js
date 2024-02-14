const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');

// teste
router.get('/user/teste', (req, res) => {
    res.status(200).json({ message: 'user teste' });
});

router.post('/user/create', userController.createUser);
router.get('/users/', authMiddleware, userController.getAllUsers);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.get('/user/', authMiddleware, userController.getUserByRequest);
router.put('/user/', authMiddleware, userController.updateUserByRequest);
router.put('/user/:id', authMiddleware, userController.updateUserById);
router.delete('/user/:id', authMiddleware, userController.deleteUserById);

module.exports = router;
