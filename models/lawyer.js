'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'user',
      });
    }
  }
  Lawyer.init({
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    license: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lawyer',
  });
  return Lawyer;
};