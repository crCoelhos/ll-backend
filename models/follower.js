const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Follower extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'followerId',
                as: 'follower',
            });

            this.belongsTo(models.User, {
                foreignKey: 'followingId',
                as: 'following',
            });
        }
    }
    Follower.init(
        {
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            followingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Follower',
            tableName: 'Followers',
        }
    );
    return Follower;
};
