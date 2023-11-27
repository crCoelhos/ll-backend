// seeders/appointmentStatusSeeder.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = [
      {
        name: 'Scheduled',
        description: 'The appointment is scheduled.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Completed',
        description: 'The appointment has been completed.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Canceled',
        description: 'The appointment has been canceled.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Overdue',
        description: 'The customer did not answer the appointment.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('AppointmentStatuses', statuses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AppointmentStatuses', null, {});
  },
};
