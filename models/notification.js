'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {

        static associate(models) {
            Notification.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'Notifications'

        }
    );
    return Notification;
};