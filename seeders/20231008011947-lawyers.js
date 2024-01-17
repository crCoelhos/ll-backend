'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyerData = [
      {
        OAB: '654321',
        riteDate: '2022-01-01',
        userId: 3,
        secNumber: '321',
        inscriptionType: '321',
        UF: 'AC',
        graduateDegree: 'Mestre',
        description: 'Advogado especialista em direito do consumidor',
        image: 'https://i.imgur.com/3hBbZ2Y.png',

      },
      {
        OAB: '123456',
        riteDate: '2022-01-01',
        userId: 2,
        secNumber: '123',
        inscriptionType: '123',
        UF: 'AC',
        graduateDegree: 'Doutor',
        description: 'Advogado especialista em direito do trabalhador',
        image: 'https://i.imgur.com/3hBbZ2Y.png',

      },
    ];

    await queryInterface.bulkInsert('Lawyers', lawyerData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lawyers', null, {});
  },
};
