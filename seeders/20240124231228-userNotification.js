'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userNotificationsData = [
      {
        isRead: false,
        userId: 1,
        notificationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: 2,
        notificationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: null,
        notificationId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: null,
        notificationId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('UserNotifications', userNotificationsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserNotifications', null, {});
  }
};
