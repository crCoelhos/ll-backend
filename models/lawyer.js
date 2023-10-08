const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      this.belongsToMany(models.Expertise, {
        through: 'LawyerExpertise',
        foreignKey: 'lawyerId',
        as: 'expertises',
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
    },
    {
      sequelize,
      modelName: 'Lawyer',
      tableName: 'Lawyers',
    }
  );

  return Lawyer;
};
