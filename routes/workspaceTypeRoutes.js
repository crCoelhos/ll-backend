const express = require('express');
const router = express.Router();
const workspaceTypeController = require('../controllers/workspaceTypeController.js');

// teste
router.get('/workspaceType/teste', (req, res) => {
    res.status(200).json({ message: 'workspaceType teste' });
});

router.get('/workspaceTypes/', workspaceTypeController.getAllWorkspaceTypes);
router.get('/workspaceType/:id', workspaceTypeController.getWorkspaceTypeById);
router.post('/workspaceType/', workspaceTypeController.createWorkspaceType);
router.put('/workspaceType/:id', workspaceTypeController.updateWorkspaceTypeById);
router.delete('/workspaceType/:id', workspaceTypeController.deleteWorkspaceTypeById);

module.exports = router;