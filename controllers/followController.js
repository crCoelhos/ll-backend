const { User, Follower, Lawyer } = require('../models');

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


const followLawyer = async (req, res) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.id;

        const lawyer = await Lawyer.findByPk(followingId);

        if (!lawyer || !lawyer.userId) {
            return res.status(404).json({ error: 'Advogado não encontrado' });
        }

        if (Number(followerId) === Number(lawyer.userId)) {
            return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });
        }

        const existingFollower = await Follower.findOne({
            where: {
                followerId,
                followingId: lawyer.userId,
            },
        });

        if (existingFollower) {
            return res.status(400).json({ error: 'Você já está seguindo este usuário' });
        }

        const newFollower = await Follower.create({
            followerId,
            followingId: lawyer.userId,
        });

        res.status(201).json(newFollower);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const unfollowLawyer = async (req, res) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.id;

        const lawyer = await Lawyer.findByPk(followingId);

        if (!lawyer || !lawyer.userId) {
            return res.status(404).json({ error: 'Advogado não encontrado' });
        }

        const existingFollower = await Follower.findOne({
            where: {
                followerId,
                followingId: lawyer.userId,
            },
        });

        if (existingFollower) {

            await Follower.destroy({
                where: {
                    followerId,
                    followingId,
                },
            });
        }


        res.status(200).json({ message: 'Usuário deixou de seguir com sucesso' });
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

const userFollowers = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const followers = await Follower.findAll({
            where: { followingId: userId },
            raw: true,
        });


        if (followers.length === 0) {
            return res.status(200).json({ message: 'O usuário não possui seguidores' });
        }

        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const myFollowers = async (req, res) => {
    try {


        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const followers = await Follower.findAll({
            where: { followingId: userId },
            raw: true,
        });

        if (followers.length === 0) {
            return res.status(200).json({ message: 'Você não possui seguidores' });
        }


        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const lawyerFollowers = async (req, res) => {
    try {
        const lawyerId = req.params.id;

        // Verifica se o advogado existe
        const lawyer = await Lawyer.findByPk(lawyerId);

        if (!lawyer || !lawyer.userId) {
            return res.status(404).json({ error: 'Advogado não encontrado' });
        }

        // Obtém os seguidores do advogado
        const followers = await Follower.findAll({
            where: { followingId: lawyer.userId },
            raw: true,
        });

        if (followers.length === 0) {
            return res.status(200).json({ message: 'O advogado não possui seguidores' });
        }

        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    followUser,
    unfollowUser,
    userFollowers,
    followedBy,
    iAmFollowing,
    myFollowers,

    followLawyer,
    unfollowLawyer,
    lawyerFollowers
};