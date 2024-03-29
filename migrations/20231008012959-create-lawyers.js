'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lawyers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OAB: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      secNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inscriptionType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      UF: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      riteDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      graduateDegree: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Bacharel em Direito',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lawyers');
  }
};
