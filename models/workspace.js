'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Workspace extends Model {
    static associate(models) {
      Workspace.belongsTo(models.WorkspaceType,
        {
          foreignKey: 'workspaceTypeId'
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
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      workspaceTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'WorkspaceTypes',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Workspace',
    }
  );

  return Workspace;
};
