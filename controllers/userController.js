const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

// TEM QUE ARRUMAR VALIDAÇÃO COM ROLE E JWT


async function createUser(req, res) {
    try {
        const { name, email, CPF, birthdate, password, OAB, riteDate, roleId } = req.body;

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
                roleId: roleId // Definir roleId com o valor recebido no corpo da solicitação
            });
        }

        if (OAB && riteDate) {
            const lawyer = await Lawyer.create({
                OAB: OAB,
                riteDate: riteDate,
                userId: user.id
            });
            res.status(201).json(lawyer);
        } else {
            res.status(201).json(user);
        }
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
