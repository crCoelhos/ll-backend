const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// teste
router.get('/follow/teste', (req, res) => {
    res.status(200).json({ message: 'follow teste' });
});

router.post('/follow/:id', authMiddleware, followController.followUser);
router.post('/follow-lawyer/:id', authMiddleware, followController.followLawyer);
router.delete('/unfollow-lawyer/:id', authMiddleware, followController.unfollowLawyer);
router.delete('/unfollow/:id', authMiddleware, followController.unfollowUser);
router.get('/followers/:id', authMiddleware, followController.userFollowers);
router.get('/followed-by/:id', followController.followedBy);
router.get('/my-follows/', authMiddleware, followController.iAmFollowing);

module.exports = router;
