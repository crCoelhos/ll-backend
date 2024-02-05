
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    static associate(models) {
      UserAddress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      UserAddress.belongsTo(models.Address, {
        foreignKey: 'addressId',
        as: 'address',
      });
    }
  }

  UserAddress.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserAddress',
      tableName: 'UserAddresses',
    }
  );

  return UserAddress;
};
