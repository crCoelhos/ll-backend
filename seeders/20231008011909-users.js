const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        name: 'Jorge',
        email: 'jorge@example.com',
        phoneNumber: '12345678901',
        CPF: '12345678901',
        birthdate: '1990-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rogério',
        email: 'rogerio@example.com',
        phoneNumber: '12345678902',
        CPF: '12345678902',
        birthdate: '1991-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leticia',
        email: 'leticia@example.com',
        phoneNumber: '12345678903',
        CPF: '12345678903',
        birthdate: '1992-01-01',
        password: await bcrypt.hash('senha123', 10),
        isActive: true,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Administrador',
        email: 'admin@admin.com',
        phoneNumber: '5764',
        CPF: '57',
        birthdate: '1992-01-01',
        password: await bcrypt.hash('admin', 10),
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
