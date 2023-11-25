const db = require('../models');
const RoomType = db.RoomType;



async function createRoomType(req, res) {
    try {
        const { name, description } = req.body;
        const role = await RoomType.create({
            name: name,
            description: description,
        });
        res.status(201).json(role);

    } catch (err) {
        console.error('Erro no createRoomType:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

async function getAllRoomTypes(req, res) {
    try {

        const roles = await RoomType.findAll();
        res.status(200).json(roles);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getRoomTypeById(req, res) {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await RoomType.findOne({
            where: { id: id }
        })
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updateRoomTypeById(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const roleUpdate = await RoomType.findByPk(id)
        if (!roleUpdate) {
            res.json({ message: 'RoomType não encontrada' })

        }
        const role = req.body;

        await RoomType.update(role, {
            where: { id: id }
        });
        return res.status(200).json({ message: "RoomType atualizada" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteRoomTypeById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await RoomType.findByPk(id)
        if (role) {
            await role.destroy()
            res.status(204).json({ message: 'RoomType excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'RoomType não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomTypeById,
    deleteRoomTypeById,
}
