const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspacesData = [
      {
        name: 'Sala 1',
        description: 'sala 1',
        capacity: 12,
        roomTypeId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sala 2',
        description: 'sala 2',
        capacity: 12,
        roomTypeId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sala 3',
        description: 'sala 3',
        capacity: 12,
        roomTypeId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Workspaces', workspacesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Workspaces', null, {});
  },
};
