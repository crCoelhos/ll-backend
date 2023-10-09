const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            Address.belongsToMany(models.User, {
                through: models.UserAddress,
                foreignKey: 'addressId',
                as: 'users',
            });
        }
    }

    Address.init(
        {
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            CEP: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Address',
            tableName: 'Addresses',
        }
    );

    return Address;
};
