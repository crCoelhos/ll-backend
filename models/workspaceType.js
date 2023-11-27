'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class WorkspaceType extends Model {
        static associate(models) {
            WorkspaceType.hasMany(models.Workspace,
                {
                    foreignKey: 'workspaceTypeId'
                });
        }
    }

    WorkspaceType.init(
        {
            typeName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'WorkspaceType',
            tableName: 'workspaceTypes',
        }
    );

    return WorkspaceType;
};
