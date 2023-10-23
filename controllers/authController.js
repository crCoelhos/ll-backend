const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Address } = require('../models');

async function signup(req, res) {
  try {
    const { name, email, password, CPF, birthdate, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!address) {
      return res.status(400).json({ error: 'O endereço é obrigatório.' });
    }

    const userData = { name, email, password: hashedPassword, roleId: 1, CPF, birthdate };
    const user = await User.create(userData);

    const addressData = {
      state: address.state,
      street: address.street,
      city: address.city,
      CEP: address.CEP,
      userId: user.id,
    };
    await Address.create(addressData);

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}


async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: '(auth 2)Usuário não encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
}

module.exports = { signup, signin };
