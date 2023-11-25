// models/workspace.js
'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
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
        defaultValue: 0,
      },
      roomTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'RoomTypes',
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
