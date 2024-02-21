// models/Notification.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            this.belongsToMany(models.User, {
                through: models.UserNotification,
                foreignKey: 'notificationId',
                as: 'notificationUsers',
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
