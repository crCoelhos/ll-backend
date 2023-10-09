const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        name: 'Nome do Usuário 1',
        email: 'usuario1@example.com',
        CPF: '12345678901',
        birthdate: '1990-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
