const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserNotification extends Model {
        static associate(models) {
            UserNotification.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });

            UserNotification.belongsTo(models.Notification, {
                foreignKey: 'notificationId',
                as: 'notification',
            });
        }
    }
    UserNotification.init(
        {
            isRead: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'UserNotification',
            tableName: 'UserNotifications',
        }
    );
    return UserNotification;
};
