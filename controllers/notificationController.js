
const { User, Notification, UserNotification } = require('../models');


async function createNotification(req, res) {
    try {
        const { title, message, userId } = req.body;

        if (!title || !message) {
            return res.status(400).json({ error: 'Título e mensagem são obrigatórios' });
        }

        if (!userId) {
            const notification = await Notification.create({
                title: title,
                message: message,
                isRead: 0,
            });

            const global = await User.findByPk(1);
            await global.addNotification(notification);

            return res.status(201).json(notification);
        }

        const notification = await Notification.create({
            title: title,
            message: message,
            isRead: 0,
        });

        const user = await User.findByPk(userId);
        await user.addNotification(notification);

        return res.status(201).json(notification);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function getAllUserNotifications(req, res) {
    try {

        const global = await User.findByPk(1);;
        const user = await User.findByPk(req.user.id);

        const globalNotifications = await global.getNotifications();
        if (!user) {
            return res.json({ globalNotifications, personalNotifications: [] });
        }


        const notifications = await user.getNotifications();

        return res.json({ globalNotifications, personalNotifications: notifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function getAllGlobalNotifications(req, res) {

    try {

        const global = await User.findByPk(1);

        if (!global) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const globalNotifications = await global.getNotifications();

        return res.json(globalNotifications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            console.error('Notificação não encontrada');
            return res.status(404).json({ error: 'Notificação não encontrada' });
        }

        const userNotification = await UserNotification.findOne({
            where: {
                userId,
                notificationId,
            },
        });

        if (!userNotification) {
            console.error('Associação UserNotification não encontrada');
            return res.status(404).json({ error: 'Associação UserNotification não encontrada' });
        }

        userNotification.isRead = true;
        await userNotification.save();

        console.log('Notificação marcada como lida com sucesso!');
        return res.status(200).json({ message: 'Notificação marcada como lida com sucesso!' });
    } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
        return res.status(500).json({ error: 'Erro ao marcar notificação como lida' });
    }
};



const markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const userNotifications = await UserNotification.findAll({
            where: {
                userId,
            },
        });

        if (!userNotifications || userNotifications.length === 0) {
            console.error('Nenhuma associação UserNotification encontrada');
            return res.status(404).json({ error: 'Nenhuma associação UserNotification encontrada' });
        }

        for (const userNotification of userNotifications) {
            userNotification.isRead = true;
            await userNotification.save();
        }

        console.log('Todas as notificações marcadas como lidas com sucesso!');
        return res.status(200).json({ message: 'Todas as notificações marcadas como lidas com sucesso!' });
    } catch (error) {
        console.error('Erro ao marcar todas as notificações como lidas:', error);
        return res.status(500).json({ error: 'Erro ao marcar todas as notificações como lidas' });
    }
};






module.exports = {
    createNotification,
    getAllUserNotifications,
    getAllGlobalNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead
};
