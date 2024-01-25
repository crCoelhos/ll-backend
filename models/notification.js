const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            Notification.hasMany(models.UserNotification, {
                foreignKey: 'notificationId',
                as: 'userNotifications',
            });
        }
    }
    Notification.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'Notifications',
        }
    );
    return Notification;
};
