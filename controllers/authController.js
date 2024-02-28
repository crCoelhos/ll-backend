const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Address } = require('../models');
const { getAllProcesses } = require('./processController');
const { scraper } = require('./scraperComunicationController');

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

    // TODO: need verification with mail here.

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
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // TODO: Discutir se coloca tentativas de login, ai deixar a pessoa sem tentar entrar


    const { id, name, roleId, isActive } = user;
    const token = jwt.sign({ userId: id }, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, name, email, roleId, isActive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.', fullError: error.stack });
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const resetToken = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });

    await user.update({ passwordRecoveryToken: resetToken });

    // TODO: send mail with token for user

    res.status(200).json({ message: 'Instruções de recuperação de senha enviadas para o e-mail fornecido.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a solicitação de recuperação de senha.' });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const decodedToken = jwt.verify(token, config.jwtSecret);

    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (user.passwordRecoveryToken !== token) {
      return res.status(401).json({ error: 'Token de recuperação de senha inválido.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword, passwordRecoveryToken: null });

    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao redefinir a senha.' });
  }
}

module.exports = { signup, signin, requestPasswordReset, resetPassword };
