'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      this.belongsToMany(models.Expertise, {
        through: 'LawyerExpertises',
        foreignKey: 'lawyerId',
        as: 'expertises',
      });

      this.hasMany(models.ProcessNumber, {
        foreignKey: 'lawyerId',
        as: 'processNumbers',
      });

    }
  }

  Lawyer.init(
    {
      OAB: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      riteDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      secNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inscriptionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      graduateDegree: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elaboratedDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      professionalDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      callmeReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      UF: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Lawyer',
      tableName: 'Lawyers',
    }
  );

  return Lawyer;
};
