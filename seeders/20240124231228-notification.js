'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Notifications', [
      {
        title: 'Notificação 1',
        message: 'Esta é a primeira notificação',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Notificação 2',
        message: 'Esta é a segunda notificação',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Notificação Global 1',
        message: 'Esta é a notificação global 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Notificação Global 2',
        message: 'Esta é a notificação global 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
