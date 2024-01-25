'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Followers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            followerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            followingId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addConstraint('Followers', {
            fields: ['followerId'],
            type: 'foreign key',
            name: 'fk_follower_followerId',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Followers', {
            fields: ['followingId'],
            type: 'foreign key',
            name: 'fk_follower_followingId',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Followers', 'fk_follower_followerId');
        await queryInterface.removeConstraint('Followers', 'fk_follower_followingId');

        await queryInterface.dropTable('Followers');
    },
};
