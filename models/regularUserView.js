'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class RegularUserView extends Model { }

    RegularUserView.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_birthdate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            address_state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_street: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_CEP: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'regular_user_view',
            timestamps: false,
        }
    );

    return RegularUserView;
}

