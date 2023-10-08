module.exports = {
  up: async (queryInterface, Sequelize) => {
    const expertisesData = [
      {
        name: 'Expertise 1',
        graduationDate: '2020-01-01',
        institutionName: 'Instituição 1',
        institutionState: 'Estado 1',
        institutionCity: 'Cidade 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Expertise 2',
        graduationDate: '2021-02-15',
        institutionName: 'Instituição 2',
        institutionState: 'Estado 2',
        institutionCity: 'Cidade 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Expertises', expertisesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Expertises', null, {});
  },
};
