const db = require('../models');
const Address = db.Address;


async function createAddress(req, res) {
    try {
        const { state, street, city, CEP } = req.body;
        const address = await Address.create({
            state: state,
            street: street,
            city: city,
            CEP: CEP,
        });
        res.status(201).json(address);

    } catch (err) {
        console.error('Erro no createAddress:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

async function getAllAddresss(req, res) {
    try {

        const addresss = await Address.findAll();
        res.status(200).json(addresss);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getAddressById(req, res) {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const address = await Address.findOne({
            where: { id: id }
        })
        res.status(200).json(address);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updateAddressById(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const addressUpdate = await Address.findByPk(id)
        if (!addressUpdate) {
            res.json({ message: 'Endereço não encontrado' })
        }

        const address = req.body;

        await Address.update(address, {
            where: { id: id }
        });

        return res.status(200).json({ message: "Endereço atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteAddressById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const address = await Address.findByPk(id)

        if (address) {
            await address.destroy()
            res.status(204).json({ message: 'Endereço excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Endereço não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createAddress,
    getAllAddresss,
    getAddressById,
    updateAddressById,
    deleteAddressById,
}
