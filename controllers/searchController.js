const db = require('../models');




// TODO add search by reagion
// TODO 

async function multipleFieldLawyerSearch(req, res) {
    const searchString = req.params.searchString;
    try {
        let result = await db.sequelize.query(
            `SELECT u.id, u.name, u.email, u.phoneNumber, u.CPF, u.birthdate, 
                    la.OAB, la.riteDate, la.inscriptionType, la.graduateDegree, 
                    la.description, la.image, la.UF, GROUP_CONCAT(e.name) AS expertiseNames
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
             GROUP BY u.id, la.id`,
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
    multipleFieldLawyerSearch}
