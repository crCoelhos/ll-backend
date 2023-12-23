'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Addresses', [
      {
        state: 'YourState1',
        street: 'YourStreet1',
        number: '1',
        city: 'YourCity1',
        CEP: 'YourCEP1',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        state: 'YourState2',
        street: 'YourStreet2',
        number: '2',
        city: 'YourCity2',
        CEP: 'YourCEP2',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Addresses', null, {});
  },
};
