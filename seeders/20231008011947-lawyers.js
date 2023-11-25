'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyerData = [
      {
        OAB: '123456',
        riteDate: '2022-01-01',
        userId: 3,
      },
    ];

    await queryInterface.bulkInsert('Lawyers', lawyerData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lawyers', null, {});
  },
};
