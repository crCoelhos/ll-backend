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
router.delete('/unfollow/:id', authMiddleware, followController.unfollowUser);

router.get('/followers/:id', authMiddleware, followController.userFollowers);
router.get('/followers/', authMiddleware, followController.myFollowers);
router.get('/followed-by/:id', followController.followedBy);
router.get('/my-follows/', authMiddleware, followController.iAmFollowing);

router.get('/lawyer-followers/:id', authMiddleware, followController.lawyerFollowers);
router.delete('/unfollow-lawyer/:id', authMiddleware, followController.unfollowLawyer);



module.exports = router;
