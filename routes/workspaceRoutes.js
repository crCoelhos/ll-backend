const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController.js');

// teste
router.get('/workspace/teste', (req, res) => {
    res.status(200).json({ message: 'workspace teste' });
});

router.post('/workspace/create', workspaceController.createWorkspace);
router.get('/workspaces/', workspaceController.getAllWorkspaces);
router.get('/workspace/:id', workspaceController.getWorkspaceById);
router.put('/workspace/:id', workspaceController.updateWorkspaceById);
router.delete('/workspace/:id', workspaceController.deleteWorkspaceById);

module.exports = router;