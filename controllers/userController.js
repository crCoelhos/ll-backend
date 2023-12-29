const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const Address = db.Address;
const UserAddress = db.UserAddress;

async function createUser(req, res) {
    const t = await db.sequelize.transaction();
    try {
        const { name, email, CPF, birthdate, password, OAB, riteDate, roleId, address } = req.body;

        let user = await User.findOne({
            where: { CPF: CPF }
        });

        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                name: name,
                email: email,
                CPF: CPF,
                birthdate: birthdate,
                password: hashedPassword,
                roleId: roleId
            }, { transaction: t });

            console.log('Usuário criado com sucesso.');

            //  endereço depois do user criaod
            const createdAddress = await Address.create({
                street: address.street,
                city: address.city,
                state: address.state,
                number: address.number,
                CEP: address.CEP,
                userId: user.id
            }, { transaction: t });

            console.log('Endereço criado com sucesso.');


        } else {
            console.log('Usuário já existe');
            res.status(400).json({ message: 'O usuário já existe.' });
            await t.rollback();
            return;
        }

        if (OAB && riteDate) {
            console.log('CRIANDO LAWYER')
            const lawyer = await Lawyer.create({
                OAB: OAB,
                riteDate: riteDate,
                userId: user.id
            }, { transaction: t });
            res.status(201).json(lawyer);
        } else {
            res.status(201).json(user);
        }

        await t.commit();
    } catch (err) {
        console.error('Erro no createUser:', err, req.body);
        await t.rollback();
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

        const { id } = req.params;
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
    updateUserById,
    deleteUserById,
}
