'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'roleId',
      });

      User.belongsToMany(models.Address, {
        through: models.UserAddress,
        foreignKey: 'userId',
        as: 'addresses',
      });

      this.belongsToMany(models.Notification, {
        through: models.UserNotification,
        foreignKey: 'userId',
        as: 'notifications',
      });

      this.hasMany(models.Follower, {
        foreignKey: 'followingId',
        as: 'followers',
      });

      this.hasOne(models.Lawyer, {
        foreignKey: 'userId',
        as: 'lawyer',
      });

    }


  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
      ,
      CPF: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      passwordRecoveryToken: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  return User;
};
