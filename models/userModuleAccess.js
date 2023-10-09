'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserModuleAccess extends Model {
        static associate(models) {
            UserModuleAccess.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
            UserModuleAccess.belongsTo(models.ModuleAccess, {
                foreignKey: 'moduleAccessId',
                onDelete: 'CASCADE',
            });
        }

    }

    UserModuleAccess.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            moduleAccessId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'UserModuleAccess',
            tableName: 'UserModuleAccesses',
        }
    );

    return UserModuleAccess;
};
