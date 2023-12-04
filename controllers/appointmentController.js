const { Op } = require('sequelize');
const moment = require('moment');

const { Appointment } = require('../models');

async function createAppointment(req, res) {
    try {
        const inheritedUserId = req.userId;
        console.log("id do usuário autenticado:", inheritedUserId)

        const userId = inheritedUserId;
        const { title, startDate, endDate, isPrivate, description, workspaceId, appointmentStatusId } = req.body;

        const conflictingAppointments = await Appointment.findAll({
            where: {
                workspaceId,
                appointmentStatusId: {
                    [Op.in]: [1, 2],
                },
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

async function getAllAppointmentsByWorkspaceId(req, res) {
    try {
        const workspaceId = req.params.workspaceId;

        if (!workspaceId) {
            return res.status(400).json({ error: 'ID do workspace não fornecido.' });
        }

        const appointments = await Appointment.findAll({
            where: {
                workspaceId: workspaceId,
            },
        });

        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter agendamentos por workspaceId.' });
    }
}

async function getAppointmentByWorkspaceIdAndDate(req, res) {
    try {
        const workspaceId = req.params.workspaceId;
        const appointmentDate = moment(req.params.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD');

        if (!workspaceId || !appointmentDate) {
            return res.status(400).json({ error: 'ID do workspace ou data não fornecidos.' });
        }

        const startDate = moment(appointmentDate).startOf('day').toISOString();
        const endDate = moment(appointmentDate).endOf('day').toISOString();

        const appointments = await Appointment.findAll({
            where: {
                workspaceId: workspaceId,
                startDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter agendamento por workspaceId e data.' });
    }
}

async function updateAppointment(req, res) {
    try {
        const { title, start, end, description, workspaceId, userId, appointmentStatusId, isPrivate } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }
        await appointment.update({ title, start, end, description, workspaceId, userId, appointmentStatusId, isPrivate });
        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar agendamento.' });
    }
}

async function updateAppointmentStatus(req, res, newStatus) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }

        // const conflictingAppointments = await checkConflictingAppointments(
        //     appointment.workspaceId,
        //     appointment.startDate,
        //     appointment.endDate,
        //     appointment.id
        // );

        // if (conflictingAppointments.length > 0) {
        //     return res.status(400).json({ error: 'Conflito de horário com outro agendamento.' });
        // }

        appointment.appointmentStatusId = newStatus;
        await appointment.save();

        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar status do agendamento.' });
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
    updateAppointmentStatus,
    getAppointmentById,
    getAllAppointmentsByWorkspaceId,
    getAppointmentByWorkspaceIdAndDate
};
