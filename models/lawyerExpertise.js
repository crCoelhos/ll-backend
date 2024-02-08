'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LawyerExpertise extends Model {
    static associate(models) {
    }
  }
  LawyerExpertise.init(
    {

     
    },
    {
      sequelize,
      modelName: 'LawyerExpertise',
      tableName: 'LawyerExpertises',
    }
  );

  return LawyerExpertise;
};
