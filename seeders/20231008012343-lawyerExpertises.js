module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyerExpertiseData = [
      {
        lawyerId: 1,
        expertiseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 1,
        expertiseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('LawyerExpertises', lawyerExpertiseData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LawyerExpertises', null, {});
  },
};
