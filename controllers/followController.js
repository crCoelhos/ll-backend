const { User, Follower } = require('../models');

const followUser = async (req, res) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.id;

        if (Number(followerId) === Number(followingId)) {
            console.log("Você não pode seguir a si mesmo")
            return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });
        }

        const existingFollower = await Follower.findOne({
            where: {
                followerId,
                followingId,
            },
        });


        if (existingFollower) {
            return res.status(400).json({ error: 'Você já está seguindo este usuário' });
        }

        const follower = await User.findByPk(followerId);
        const following = await User.findByPk(followingId);


        if (follower === following) {
            return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });
        }


        if (!follower || !following) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const newFollower = await Follower.create({
            followerId,
            followingId,
        });

        res.status(201).json(newFollower);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};



const unfollowUser = async (req, res) => {
    try {

        const followerId = req.user.id;
        const followingId = Number(req.params.id);

        const follower = await User.findByPk(followerId);
        const following = await User.findByPk(followingId);

        if (!follower || !following) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await Follower.destroy({
            where: {
                followerId,
                followingId,
            },
        });

        res.status(200).json({ message: 'Usuário deixou de seguir com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const followedBy = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const followedUsers = await Follower.findAll({
            where: { followerId: userId },
            include: [{ model: User, as: 'following' }],
        });

        const users = followedUsers.map((followedUser) => followedUser.following);

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const iAmFollowing = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("USUÁRIO ID: ", userId)

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const following = await Follower.findAll({
            where: { followingId: userId },
            include: [{ model: User, as: 'following' }],
        });

        const users = following.map((followed) => followed.following);

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


const myFollowers = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const followers = await Follower.findAll({
            where: { followingId: userId },
            include: [{ model: User, as: 'follower' }],
        });

        const users = followers.map((follower) => follower.follower);

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


module.exports = {
    followUser,
    unfollowUser,
    myFollowers,
    followedBy,
    iAmFollowing
};