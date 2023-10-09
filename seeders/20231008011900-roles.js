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
        name: 'USER',
        description: 'Usuário regular',
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
