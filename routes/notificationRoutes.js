const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// teste
router.get('/notification/teste', (req, res) => {
    res.status(200).json({ message: 'notification teste' });
});

router.post('/notification/create', notificationController.createNotification);
router.get('/notifications/', authMiddleware, notificationController.getAllUserNotifications);
router.get('/notifications/global/', authMiddleware, notificationController.getAllGlobalNotifications);
router.put('/notifications/read/', authMiddleware, notificationController.markAllNotificationsAsRead);
router.put('/notification/read/', authMiddleware, notificationController.markNotificationAsRead);
// router.get('/notification/:id', notificationController.getNotificationById);
// router.put('/notification/:id', notificationController.updateNotificationById);
// router.delete('/notification/:id', notificationController.deleteNotificationById);

module.exports = router;
