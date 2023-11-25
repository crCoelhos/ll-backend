// models/workspace.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Workspace extends Model {
        static associate(models) {
            Workspace.belongsTo(models.RoomType,
                {
                    foreignKey: 'roomTypeId'
                });
        }
    }

    Workspace.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            sequelize,
            modelName: 'Workspace',
            tableName: 'Workspaces',
        }
    );

    return Workspace;
};
