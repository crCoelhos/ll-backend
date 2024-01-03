const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController.js');

// teste
router.get('/role/teste', (req, res) => {
    res.status(200).json({ message: 'role teste' });
});

router.post('/role/create', roleController.createRole);
router.get('/roles/', roleController.getAllRoles);
router.get('/role/:id', roleController.getRoleById);
router.put('/role/:id', roleController.updateRoleById);
router.delete('/role/:id', roleController.deleteRoleById);

module.exports = router;
