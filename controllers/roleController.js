const db = require('../models');
const Role = db.Role;



async function createRole(req, res) {
    try {
        const { name, description } = req.body;
        const role = await Role.create({
            name: name,
            description: description,
        });
        res.status(201).json(role);

    } catch (err) {
        console.error('Erro no createRole:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

async function getAllRoles(req, res) {
    try {

        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getRoleById(req, res) {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await Role.findOne({
            where: { id: id }
        })
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updateRoleById(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const roleUpdate = await Role.findByPk(id)
        if (!roleUpdate) {
            res.json({ message: 'Role não encontrada' })

        }
        const role = req.body;

        await Role.update(role, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Role atualizada" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteRoleById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await Role.findByPk(id)
        if (role) {
            await role.destroy()
            res.status(204).json({ message: 'Role excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'Role não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
}
