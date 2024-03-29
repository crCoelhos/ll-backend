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
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYwRES33lEp2J0iTxKzAa_5sIf_oybIwVrDIF9fr-J6SrpVAnNFLnQGOMueqckpO2bsk&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
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
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        OAB: '345678',
        riteDate: '2022-01-01',
        userId: 5,
        secNumber: '345',
        inscriptionType: '345',
        UF: 'AL',
        graduateDegree: 'Bacharel',
        description: 'Advogado atuante em direito penal',
        image: 'content/uploads/2016/09/11230237/carmem-lucia.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        OAB: '111111',
        riteDate: '2022-01-01',
        userId: 6,
        secNumber: '111',
        inscriptionType: '111',
        UF: 'AP',
        graduateDegree: 'Especialista',
        description: 'Advogado especialista em direito ambiental',
        image: 'https://i.imgur.com/3hBbZ2Y.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        OAB: '222222',
        riteDate: '2022-01-01',
        userId: 7,
        secNumber: '222',
        inscriptionType: '222',
        UF: 'AP',
        graduateDegree: 'Bacharel',
        description: 'Advogado atuante em direito do consumidor',
        image: 'https://i.imgur.com/3hBbZ2Y.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Lawyers', lawyerData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lawyers', null, {});
  },
};
