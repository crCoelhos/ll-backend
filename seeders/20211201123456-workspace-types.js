module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspaceTypesData = [
      {
        typeName: 'Sala de Reunião 1',
        description: 'Sala reunião grande',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeName: 'Sala Compartilhada',
        description: 'Sala compartilhada de tamanho médio',
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
