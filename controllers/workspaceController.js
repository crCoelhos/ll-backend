const db = require('../models');
const Workspace = db.Workspace;

async function createWorkspace(req, res) {
  try {
    const { name, description, capacity, workspaceTypeId } = req.body;
    const workspace = await Workspace.create({
      name,
      description,
      capacity,
      workspaceTypeId,
    });
    res.status(201).json(workspace);
  } catch (err) {
    console.error('Erro no createWorkspace:', err, req.body);
    res.status(500).json({ message: 'Ocorreu um erro interno.' });
  }
}

async function getAllWorkspaces(req, res) {
  try {
    const workspaces = await Workspace.findAll();
    res.status(200).json(workspaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getWorkspaceById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ message: 'Você não passou o id no parâmetro' });
    }
    const workspace = await Workspace.findByPk(id);
    res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateWorkspaceById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({ message: 'Você não passou o id no parâmetro' });
    }

    const workspaceToUpdate = await Workspace.findByPk(id);
    if (!workspaceToUpdate) {
      res.json({ message: 'Workspace não encontrado' });
    }

    const workspace = req.body;

    await Workspace.update(workspace, {
      where: { id: id },
    });
    return res.status(200).json({ message: 'Workspace atualizado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteWorkspaceById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({ message: 'Você não passou o id no parâmetro' });
    }

    const workspace = await Workspace.findByPk(id);
    if (workspace) {
      await workspace.destroy();
      res.status(204).json({ message: 'Workspace excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Workspace não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspaceById,
  deleteWorkspaceById,
};
