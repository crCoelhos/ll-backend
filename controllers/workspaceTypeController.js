const db = require('../models');
const WorkspaceType = db.WorkspaceType;



async function createWorkspaceType(req, res) {
    try {
        const { name, description } = req.body;
        const role = await WorkspaceType.create({
            name: name,
            description: description,
        });
        res.status(201).json(role);

    } catch (err) {
        console.error('Erro no createWorkspaceType:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

async function getAllWorkspaceTypes(req, res) {
    try {

        const roles = await WorkspaceType.findAll();
        res.status(200).json(roles);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getWorkspaceTypeById(req, res) {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await WorkspaceType.findOne({
            where: { id: id }
        })
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updateWorkspaceTypeById(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const roleUpdate = await WorkspaceType.findByPk(id)
        if (!roleUpdate) {
            res.json({ message: 'WorkspaceType não encontrada' })

        }
        const role = req.body;

        await WorkspaceType.update(role, {
            where: { id: id }
        });
        return res.status(200).json({ message: "WorkspaceType atualizada" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteWorkspaceTypeById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await WorkspaceType.findByPk(id)
        if (role) {
            await role.destroy()
            res.status(204).json({ message: 'WorkspaceType excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'WorkspaceType não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createWorkspaceType,
    getAllWorkspaceTypes,
    getWorkspaceTypeById,
    updateWorkspaceTypeById,
    deleteWorkspaceTypeById,
}
