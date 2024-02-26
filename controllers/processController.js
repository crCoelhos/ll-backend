
const db = require('../models');
const ProcessNumber = db.ProcessNumber;
const Lawyer = db.Lawyer;
const User = db.User;

async function insertProcess(req, res) {
    const { processNumber, processTitle } = req.body;

    try {
        const userId = req.user.id;

        const lawyer = await Lawyer.findOne({
            where: { userId: userId },
        });

        const existingProcessNumber = await ProcessNumber.findOne({
            where: {
                lawyerId: lawyer.id,
                processNumber: processNumber
            },
        })

        if (!lawyer) {
            return res.status(404).json({ message: 'Advogado não encontrado.' });
        }

        if (!processNumber) {
            return res.status(400).json({ message: 'Campo obrigatório ausente.' });
        }

        if (existingProcessNumber) {
            return res.status(400).json({ message: 'Número de processo já cadastrado.' });
        }
        const createdProcess = await ProcessNumber.create({
            processNumber: processNumber,
            processTitle: processTitle ? processTitle : processNumber,
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

async function getAllUserProcesses(req, res) {
    try {


        const processes = await ProcessNumber.findAll();

        if (!processes) {
            return res.status(404).json({ message: 'Nenhum processo encontrado.' });
        }
        return res.status(200).json(processes);
    } catch (err) {
        console.error('Erro no getAllUserProcesses:', err);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}
module.exports = {
    insertProcess,
    getAllProcesses,
    getAllUserProcesses
}
