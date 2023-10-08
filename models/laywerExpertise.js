'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('LawyerExpertises', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            lawyerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Lawyers',
                    key: 'id',
                },
                allowNull: false,
            },
            expertiseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Expertises',
                    key: 'id',
                },
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
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('LawyerExpertises');
    },
};
