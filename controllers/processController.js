
const db = require('../models');
const ProcessNumber = db.ProcessNumber;
const Lawyer = db.Lawyer;
const User = db.User;

async function insertProcess(req, res) {
    const { processNumber } = req.body;

    try {
        const userId = req.user.id;

        const lawyer = await Lawyer.findOne({
            where: { userId: userId },
        });

        if (!lawyer) {
            return res.status(404).json({ message: 'Advogado não encontrado.' });
        }

        if (!processNumber) {
            return res.status(400).json({ message: 'Campo obrigatório ausente.' });
        }

        // Crie o processo associado ao advogado
        const createdProcess = await ProcessNumber.create({
            processNumber: processNumber,
            lawyerId: lawyer.id,
        });

        return res.status(201).json(createdProcess);
    } catch (err) {
        console.error('Erro no insertProcess:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

async function getAllProcesses(req, res) {
    try {
        const userId = req.user.id;

        const lawyer = await db.Lawyer.findOne({
            where: { userId: userId },
        });

        if (!lawyer) {
            return res.status(404).json({ message: 'Advogado não encontrado.' });
        }

        const processes = await ProcessNumber.findAll({
            where: { lawyerId: lawyer.id },
        });

        return res.status(200).json(processes);
    } catch (err) {
        console.error('Erro no getAllProcesses:', err);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

module.exports = {
    insertProcess,
    getAllProcesses
}
