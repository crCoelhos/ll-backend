// models/UserNotification.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserNotification extends Model {
        static associate(models) {
            models.User.belongsToMany(models.Notification, {
                through: UserNotification,
                foreignKey: 'userId',
                as: 'notifications',
                allowNull: true,
                defaultValue: 0,
            });

            models.Notification.belongsToMany(models.User, {
                through: UserNotification,
                foreignKey: 'notificationId',
                as: 'users',
            });
        }
    }

    UserNotification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            isRead: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: 'UserNotification',
            tableName: 'UserNotifications',
            indexes: [
                {
                    fields: ['userId', 'notificationId'],
                },
            ],
        }
    );

    return UserNotification;
};
