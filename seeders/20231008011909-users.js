const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        name: 'Jorge',
        email: 'jorge@example.com',
        CPF: '12345678901',
        birthdate: '1990-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rogério',
        email: 'rogerio@example.com',
        CPF: '12345678902',
        birthdate: '1991-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leticia',
        email: 'leticia@example.com',
        CPF: '12345678903',
        birthdate: '1992-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 2,
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
