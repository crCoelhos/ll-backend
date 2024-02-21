'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userNotificationsData = [
      {
        isRead: false,
        userId: 2,
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
        userId: 6,
        notificationId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: 6,
        notificationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: 1,
        notificationId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: 1,
        notificationId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: 1,
        notificationId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isRead: false,
        userId: 1,
        notificationId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('UserNotifications', userNotificationsData, {
      ignoreDuplicates: true,
      validate: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserNotifications', null, {});
  }
};
