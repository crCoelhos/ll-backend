const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const Lawyer = db.Lawyer;
const Address = db.Address;
const Expertise = db.Expertise
const LawyerExpertises = db.LawyerExpertises;
const UserAddress = db.UserAddress;

async function createUser(req, res) {
    const { name, email, CPF, birthdate, password, OAB, riteDate, address, secNumber, inscriptionType, UF } = req.body;

    try {
        if (!name || !email || !CPF || !birthdate || !password || !OAB || !riteDate || !address || !secNumber || !inscriptionType || !UF) {
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
            roleId: 3
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

            return res.status(201).json(user);
        }

        return res.status(201).json(user);
    } catch (err) {
        console.error('Erro no createUser:', err, req.body);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
        throw err;

    }
}

async function getLawyerById(req, res) {
    try {
        const id = req.params.id;

        const lawyer = await Lawyer.findByPk(id, {
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

        res.status(200).json(lawyer);

    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error('Erro ao obter advogado por ID', err);
        throw err;
    }
}

async function getLawyerByUserId(req, res) {
    try {
        const id = req.params.id;

        const user = await User.findOne({
            where: { id: id },
            include: [
                {
                    model: Lawyer,
                    as: 'lawyer',
                },
            ],
            attributes: {
                exclude: ['password', 'passwordRecoveryToken']
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Advogado não encontrado.' });
        }

        res.status(200).json(user);


    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error('Erro ao obter advogado por ID de usuário:', err);
        throw err;
    }
}


async function getUserByLawyerId(req, res) {

    try {
        const id = req.params.id;

        const lawyer = await Lawyer.findOne({
            where: { userId: id },
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

        if (!lawyer) {
            return res.status(404).json({ message: 'Advogado não encontrado.' });
        }

        res.status(200).json(lawyer);


    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error('Erro ao obter advogado por ID de usuário:', err);
        throw err;
    }
}


async function getAllLawyers(req, res) {
    try {
        const lawyers = await Lawyer.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'passwordRecoveryToken', 'createdAt', 'updatedAt']
                    },
                    where: { roleId: 3 }
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

        res.status(200).json(lawyers);
    } catch (err) {
        res.status(500).json({ message: err.message });
        throw err;
    }
}


async function getAllLawyersByExpertise(req, res) {
    try {
        const id = req.params.id;

        const lawyers = await Lawyer.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'passwordRecoveryToken', 'createdAt', 'updatedAt']
                    },
                },
                {
                    model: Expertise,
                    as: 'expertises',
                    through: {
                        model: LawyerExpertises,
                        attributes: []
                    },
                    where: { id: id },
                    attributes: []
                }
            ],
        });

        res.status(200).json(lawyers);
    } catch (err) {
        res.status(500).json({ message: err.message });
        throw err;
    }
}



async function getAllLawyersByState(req, res) {
    const UF = req.params.UF;

    try {

        const lawyers = await Lawyer.findAll({
            where: [{ UF: UF }],
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

        res.status(200).json(lawyers);
    } catch (err) {
        res.status(500).json({ message: err.message });
        throw err;
    }
}

async function updateUserByUserId(req, res) {
    const userId = req.user.id;
    const { OAB, riteDate, secNumber, inscriptionType, graduateDegree, description, elaboratedDescription, professionalDescription, callmeReason, image, UF } = req.body;

    try {
        const lawyer = await Lawyer.findOne({ where: { userId } });

        if (!lawyer) {
            return res.status(404).json({ message: 'Advogado não encontrado.' });
        }

        if (OAB) lawyer.OAB = OAB;
        if (riteDate) lawyer.riteDate = riteDate;
        if (secNumber) lawyer.secNumber = secNumber;
        if (inscriptionType) lawyer.inscriptionType = inscriptionType;
        if (UF) lawyer.UF = UF;
        if (graduateDegree) lawyer.graduateDegree = graduateDegree;
        if (description) lawyer.description = description;
        if (elaboratedDescription) lawyer.elaboratedDescription = elaboratedDescription;
        if (professionalDescription) lawyer.professionalDescription = professionalDescription;
        if (callmeReason) lawyer.callmeReason = callmeReason;
        if (image) lawyer.image = image;


        await lawyer.save();

        res.status(200).json(lawyer);
    } catch (err) {
        console.error('Erro ao atualizar informações do advogado por ID de usuário:', err);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
        throw err;
    }
}

module.exports = {
    createUser,
    getAllLawyers,
    getLawyerById,
    getLawyerByUserId,
    getUserByLawyerId,
    getAllLawyersByState,
    getAllLawyersByExpertise,
    updateUserByUserId
};