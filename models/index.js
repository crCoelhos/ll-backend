// models/roomType.js
'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class RoomType extends Model {
    static associate(models) {
      // Associação com Workspace
      RoomType.hasMany(models.Workspace, { foreignKey: 'roomTypeId' });
    }
  }

  RoomType.init(
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
      modelName: 'RoomType',
    }
  );

  return RoomType;
};
