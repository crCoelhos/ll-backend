'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Appointments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dateStart: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            dateEnd: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            startingTime: {
                type: Sequelize.TIME,
            },
            endingTime: {
                type: Sequelize.TIME,
            },
            description: {
                type: Sequelize.STRING,
            },
            isPrivate: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',

            },
            workspaceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Workspaces',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',

            },
            appointmentStatusId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'AppointmentStatuses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',

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
        await queryInterface.dropTable('Appointments');
    },
};
