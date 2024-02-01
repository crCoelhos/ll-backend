const db = require('../models');




// TODO add search by region

async function multipleFieldLawyerSearch(req, res) {
    const searchString = req.params.searchString;
    try {
        let result = await db.sequelize.query(
            `SELECT MAX(u.id) AS userId, MAX(la.id) AS lawyerId, MAX(u.name) AS name, MAX(u.email) AS email, MAX(u.phoneNumber) AS phoneNumber, MAX(u.CPF) AS CPF, MAX(u.birthdate) AS birthdate, 
                    MAX(la.OAB) AS OAB, MAX(la.riteDate) AS riteDate, MAX(la.inscriptionType) AS inscriptionType, MAX(la.graduateDegree) AS graduateDegree, 
                    MAX(la.description) AS description, MAX(la.image) AS image, MAX(la.UF) AS UF, GROUP_CONCAT(e.name) AS expertiseNames
             FROM Users AS u
             LEFT JOIN Lawyers AS la ON u.id = la.userId
             LEFT JOIN LawyerExpertises AS le ON la.id = le.lawyerId
             LEFT JOIN Expertises AS e ON le.expertiseId = e.id
             WHERE (u.name LIKE '%${searchString}%' OR
                    u.phoneNumber LIKE '%${searchString}%' OR
                    la.OAB LIKE '%${searchString}%' OR
                    la.graduateDegree LIKE '%${searchString}%' OR
                    la.UF LIKE '%${searchString}%' OR
                    e.name LIKE '%${searchString}%')
             AND u.roleId = 3
             AND u.id = la.userId
             GROUP BY la.userId`,
            { type: db.sequelize.QueryTypes.SELECT }
        );

        result = result.map(user => {
            delete user.password;
            delete user.roleId;
            delete user.secNumber;
            delete user.createdAt;
            delete user.updatedAt;
            return user;
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
        throw err;
    }
}








module.exports = {
    multipleFieldLawyerSearch
}
