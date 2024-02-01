const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const Lawyer = db.Lawyer;
const Expertise = db.Expertise;
const LawyerExpertise = db.LawyerExpertises;
const Address = db.Address;
const UserAddress = db.UserAddress;
const LawyerExpertises = db.LawyerExpertises;


async function createUser(req, res) {
    const { name, email, CPF, birthdate, password, OAB, riteDate, address, secNumber, inscriptionType, UF } = req.body;

    try {
        if (!name || !email || !CPF || !birthdate || !password) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
        }

        const existingUser = await User.findOne({ where: { CPF: CPF } });
        if (existingUser) {
            return res.status(400).json({ message: 'O usuário já existe.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            CPF: CPF,
            birthdate: birthdate,
            password: hashedPassword,
            roleId: 5
        });


        const createdAddress = await Address.create({
            street: address.street,
            city: address.city,
            state: address.state,
            number: address.number,
            CEP: address.CEP,
            userId: user.id
        });

        if (OAB && riteDate && UF && inscriptionType && secNumber) {
            const lawyer = await Lawyer.create({
                OAB: OAB,
                riteDate: riteDate,
                userId: user.id,
                secNumber: secNumber,
                inscriptionType: inscriptionType,
                UF: UF
            });

            return res.status(201).json(lawyer);
        }

        return res.status(201).json(user);
    } catch (err) {
        console.error('Erro no createUser:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}


async function getAllUsers(req, res) {
    try {

        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            }
        });
        res.status(200).json(users);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getUserById(req, res) {
    try {

        const id = req.params.id;

        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['roleId', 'password'],
            }
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUserByRequest(req, res) {
    try {
        const userId = req.user.id;


        const user = await User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['roleId', 'password', 'id', 'passwordRecoveryToken', 'createdAt',],
            }
        });


        const lawyer = await Lawyer.findOne({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'passwordRecoveryToken']
                    },
                },
                {
                    model: Expertise,
                    as: 'expertises',
                    through: {
                        model: LawyerExpertises,
                        attributes: []
                    },
                    attributes: ['id', 'name']
                }
            ],
        });


        if (lawyer) {
            return res.status(200).json(lawyer);
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUserById(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const userUpdate = await User.findByPk(id)
        if (!userUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const user = req.body;

        await User.update(user, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUserByRequest(req, res) {
    try {


        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const userUpdate = await User.findByPk(id)
        if (!userUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const user = req.body;

        await User.update(user, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteUserById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id)
        if (user) {
            await user.destroy()
            res.status(204).json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByRequest,
    updateUserById,
    deleteUserById,
}
