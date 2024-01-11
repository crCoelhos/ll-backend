module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rolesData = [
      {
        name: 'ADMIN',
        description: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DEV',
        description: 'Desenvolvedor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ADV',
        description: 'Advogado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ORG',
        description: 'Organização',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'USER',
        description: 'Usuário',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TEST',
        description: 'Usuário teste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Roles', rolesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
