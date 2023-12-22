const db = require('../models');
const AppointmentStatus = db.AppointmentStatus;

async function createAppointmentStatus(req, res) {
    try {
        const { name, description } = req.body;
        const appointmentStatus = await AppointmentStatus.create({
            name: name,
            description: description,
        });
        res.status(201).json(appointmentStatus);

    } catch (err) {
        console.error('Erro no createAppointmentStatus:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}



async function getAllAppointmentStatuses(req, res) {
    try {

        const appointmentstatus = await AppointmentStatus.findAll();
        res.status(200).json(appointmentstatus);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getAppointmentStatusById(req, res) {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await AppointmentStatus.findOne({
            where: { id: id }
        })
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updateAppointmentStatus(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const roleUpdate = await AppointmentStatus.findByPk(id)
        if (!roleUpdate) {
            res.json({ message: 'AppointmentStatus não encontrada' })

        }
        const role = req.body;

        await AppointmentStatus.update(role, {
            where: { id: id }
        });
        return res.status(200).json({ message: "AppointmentStatus atualizada" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteAppointmentStatus(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const role = await AppointmentStatus.findByPk(id)
        if (role) {
            await role.destroy()
            res.status(204).json({ message: 'AppointmentStatus excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'AppointmentStatus não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createAppointmentStatus,
    getAllAppointmentStatuses,
    deleteAppointmentStatus,
    updateAppointmentStatus,
    getAppointmentStatusById,
};
