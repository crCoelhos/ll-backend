module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyerExpertiseData = [
      {
        lawyerId: 1,
        expertiseId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 1,
        expertiseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 2,
        expertiseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 3,
        expertiseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 4,
        expertiseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 4,
        expertiseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lawyerId: 5,
        expertiseId: 4,
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
