'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LawyerExpertises extends Model {
    static associate(models) {
    }
  }
  LawyerExpertises.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      lawyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Lawyers',
          key: 'id',
        },
      },
      expertiseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Expertises',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'LawyerExpertises',
      tableName: 'LawyerExpertises',
    }
  );

  return LawyerExpertises;
};
