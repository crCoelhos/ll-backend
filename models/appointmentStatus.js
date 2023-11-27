'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentStatus extends Model {

        static associate(models) {
        }
    }
    AppointmentStatus.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'AppointmentStatus',
            tableName: 'AppointmentStatuses'

        }
    );
    return AppointmentStatus;
};