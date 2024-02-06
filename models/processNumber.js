'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProcessNumber extends Model {
        static associate(models) {
            this.belongsTo(models.Lawyer, {
                foreignKey: 'lawyerId',
                as: 'lawyer',
            });
        }
    }

    ProcessNumber.init(
        {
            processNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            processTitle: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'ProcessNumber',
            tableName: 'ProcessNumbers',
        }
    );

    return ProcessNumber;
};
