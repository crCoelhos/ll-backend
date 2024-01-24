const db = require('../models');
const Notification = db.Notification;
const User = db.User;

async function getNotifications(req, res) {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Notification,
                    as: 'notifications',
                },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const notifications = user.notifications;

        return res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações:', error);
        return res.status(500).json({ message: 'Erro interno ao obter notificações.' });
    }
}

async function getGlobalNotifications(req, res) {
    try {
        const globalNotifications = await Notification.findAll({
            where: { userId: null },
            attributes: ['id', 'title', 'message', 'isRead', 'createdAt'],
        });

        res.status(200).json(globalNotifications);
    } catch (error) {
        console.error('Erro ao obter notificações globais:', error);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}

module.exports = {
    getNotifications,
    getGlobalNotifications,

}
