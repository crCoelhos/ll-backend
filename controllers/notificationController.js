const db = require('../models');
const Notification = db.Notification;
const User = db.User;
const UserNotification = db.UserNotification;

async function getGlobalNotifications(req, res) {
    try {
        const userId = req.user.id;

        const globalNotifications = await Notification.findAll({
            include: [{
                model: UserNotification,
                as: 'userNotifications',
                where: {
                    userId: null,
                },
                attributes: [],
            }],
            attributes: ['id', 'title', 'message', 'createdAt'],
        });

        res.status(200).json(globalNotifications);
    } catch (error) {
        console.error('Erro ao obter notificações globais:', error);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
}



async function getNotifications(req, res) {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Notification,
                    as: 'notifications',
                    through: { model: UserNotification, attributes: ['isRead'] },
                },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const formattedNotifications = user.notifications.map(notification => ({
            id: notification.id,
            title: notification.title,
            message: notification.message,
            createdAt: notification.createdAt,
            isRead: notification.UserNotification.isRead,
        }));

        return res.status(200).json(formattedNotifications);
    } catch (error) {
        console.error('Erro ao obter notificações:', error);
        return res.status(500).json({ message: 'Erro interno ao obter notificações.' });
    }
}


module.exports = {
    getNotifications,
    getGlobalNotifications,

}
