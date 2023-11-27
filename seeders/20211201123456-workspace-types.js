module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspaceTypesData = [
      {
        typeName: 'Sala Reunião 1',
        description: 'Sala Reunião 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeName: 'Sala Reunião 2',
        description: 'Sala Reunião 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeName: 'Mesa colaborativa',
        description: 'Mesa colaborativa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('WorkspaceTypes', workspaceTypesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WorkspaceTypes', null, {});
  },
};
