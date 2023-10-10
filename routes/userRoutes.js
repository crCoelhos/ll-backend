const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// teste
router.get('/user/teste', (req, res) => {
    res.status(200).json({ message: 'user teste' });
});

router.get('/users/', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user/', userController.createUser);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);

module.exports = router;
