const { Op } = require('sequelize');

const { Appointment } = require('../models');

async function createAppointment(req, res) {
    try {
        const userId = req.user.id;
        const { title, startDate, endDate, isPrivate, description, workspaceId, appointmentStatusId } = req.body;

        const conflictingAppointments = await Appointment.findAll({
            where: {
                workspaceId,
                appointmentStatusId: '1',
                [Op.or]: [
                    {
                        startDate: {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        endDate: {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        [Op.and]: [
                            { startDate: { [Op.lte]: startDate } },
                            { endDate: { [Op.gte]: endDate } },
                        ],
                    },
                ],
            },
        });

        if (conflictingAppointments.length > 0) {
            return res.status(400).json({ error: 'Conflito de horário com outro agendamento.' });
        }

        const newAppointment = await Appointment.create({
            title,
            startDate,
            endDate,
            description,
            isPrivate,
            userId,
            workspaceId,
            appointmentStatusId,
        });

        res.status(201).json({ appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar agendamento.' });
    }
}


async function getAppointmentById(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(400).json({ error: 'ID não fornecido.' });
        }
        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter agendamento.' });
    }
}

async function getAllPublicAppointments(req, res) {
    try {
        const appointments = await Appointment.findAll({
            where: {
                isPrivate: 0
            }
        });
        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter agendamentos.' });
    }
}

async function getAllAppointments(req, res) {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter agendamentos.' });
    }
}

// getAllPrivateAppointments


async function updateAppointment(req, res) {
    try {
        const { title, start, end, description } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }
        await appointment.update({ title, start, end, description });
        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar agendamento.' });
    }
}

async function deleteAppointment(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }
        await appointment.destroy();
        res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar agendamento.' });
    }
}

module.exports = {
    createAppointment,
    getAllAppointments,
    getAllPublicAppointments,
    deleteAppointment,
    updateAppointment,
    getAppointmentById
};
