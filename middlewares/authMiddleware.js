const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

async function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Acesso não autorizado. Faça login para continuar.' });
    }
    try {
        const decoded = jwt.verify(authHeader, config.jwtSecret);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            console.log(decoded.userId)
            // ta decodificando direito mas e
            return res.status(401).json({ message: '(auth 1)Usuário não encontrado.' });
        }

        //const roles = Array.isArray(decoded.roles) ? decoded.roles : [];

        req.user = {
            id: user.id,
            email: user.email,
            //roles: roles,
        };

        //console.log(req.user)

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Sua sessão expirou. Faça login novamente.' });
        }
        res.status(401).json({ error, message: 'Acesso não autorizado. Faça login para continuaraaa.' });
    }
}

module.exports = authMiddleware;