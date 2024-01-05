const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspacesData = [
      {
        name: 'Titulo da Sala 1',
        description: 'descrição da sala 1',
        capacity: 12,
        workspaceTypeId: '1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Titulo da Sala 2',
        description: 'descrição da sala 2',
        capacity: 12,
        workspaceTypeId: '2',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Titulo da Sala 3',
        description: 'descrição da sala 3',
        capacity: 12,
        workspaceTypeId: '3',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Titulo da Sala 4',
        description: 'descrição da sala 4',
        capacity: 12,
        workspaceTypeId: '3',
        isActive: false,
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
