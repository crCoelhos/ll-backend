'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DailyWatch extends Model {
        static associate(models) {

        }
    }

    DailyWatch.init(
        {
            processNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            response: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'DailyWatch',
            tableName: 'DailyWatches',
        }
    );

    return DailyWatch;
};
