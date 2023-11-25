module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roomTypesData = [
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

    await queryInterface.bulkInsert('RoomTypes', roomTypesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RoomTypes', null, {});
  },
};
