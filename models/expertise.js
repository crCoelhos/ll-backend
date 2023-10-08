'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Expertise extends Model {
        static associate(models) {
            this.belongsToMany(models.Lawyer, {
                through: 'LawyerExpertise',
                foreignKey: 'expertiseId',
                as: 'lawyers',
            });
        }
    }

    Expertise.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            graduationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            institutionName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institutionState: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institutionCity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Expertise',
            tableName: 'Expertises',
        }
    );

    return Expertise;
};
