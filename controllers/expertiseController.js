const db = require('../models');
const Expertise = db.Expertise;

// TEM QUE ARRUMAR VALIDAÇÃO COM ROLE E JWT


async function createExpertise(req, res) {
    try {
        const { name, description } = req.body;
        const expertise = await Expertise.create({
            name: name,
            description: description,
        });
        res.status(201).json(expertise);

    } catch (err) {
        console.error('Erro no createExpertise:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

async function getAllExpertises(req, res) {
    try {

        const expertises = await Expertise.findAll();
        res.status(200).json(expertises);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getExpertiseById(req, res) {
    try {

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const expertise = await Expertise.findOne({
            where: { id: id }
        })
        res.status(200).json(expertise);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updateExpertiseById(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const expertiseUpdate = await Expertise.findByPk(id)
        if (!expertiseUpdate) {
            res.json({ message: 'Expertise não encontrada' })

        }
        const expertise = req.body;

        await Expertise.update(expertise, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Expertise atualizada" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteExpertiseById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const expertise = await Expertise.findByPk(id)
        if (expertise) {
            await expertise.destroy()
            res.status(204).json({ message: 'Expertise excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'Expertise não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createExpertise,
    getAllExpertises,
    getExpertiseById,
    updateExpertiseById,
    deleteExpertiseById,
}
